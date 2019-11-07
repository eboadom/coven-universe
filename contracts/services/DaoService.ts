import {
  ContractService,
  EWeb3ProviderType,
  IEthereumTransactionModel,
} from "./ContractService"
import {
  tEthereumAddress,
  getConfiguration,
  METADATA_SEPARATOR,
} from "../server/configuration"
import {
  bnToBigNumber,
  tStringCurrencyUnits,
  decimalsToCurrencyUnits,
  tBigNumberDecimalUnits,
  ADDRESS_0x0,
  currencyUnitsToDecimals,
  stringToBigNumber,
  getKeyByValue,
} from "../utils/common-utils"
import {path as rootPath} from "app-root-path"
import {Reputation} from "../types/web3-contracts/Reputation"
import {ContributionReward} from "../types/web3-contracts/ContributionReward"
import {QuorumVote} from "../types/web3-contracts/QuorumVote"
import {EventData} from "web3-eth-contract"
import BigNumber from "bignumber.js"
import {
  WizardsService,
  IWizardData,
  IWizardWalletDaoWithReputation,
} from "./WizardsService"
import {DaoCreator} from "../types/web3-contracts/DaoCreator"
import {Avatar} from "../types/web3-contracts/Avatar"

export enum eVote {
  ABSTAIN = 0,
  YES = 1,
  NO = 2,
}

export enum eProposalStatus {
  Voting = "Voting",
  Redeemable = "Redeemable",
  Redeemed = "Redeemed",
}

export enum eGrateType {
  BALANCE = "BALANCE",
  OCEAN = "OCEAN",
  STORM = "STORM",
  FLAME = "FLAME",
  MOLD = "MOLD",
}

export enum eGrateStringIndex {
  BALANCE = "0",
  OCEAN = "1",
  STORM = "2",
  FLAME = "3",
  MOLD = "4",
}

export enum eContributionRewardEvent {
  NewContributionProposal = "NewContributionProposal",
  ProposalExecuted = "ProposalExecuted",
  RedeemReputation = "RedeemReputation",
}

export enum eReputationEvents {
  Mint = "Mint",
  Burn = "Burn",
}

export enum eQuorumVoteEvents {
  VoteProposal = "VoteProposal",
}

export enum eDaoCreatorEvents {
  NewOrg = "NewOrg",
}

export enum eAvatarEvents {
  MetaData = "MetaData",
}

export enum eProposalDescription {
  MINT_REPUTATION = "MINT_REPUTATION",
}

export enum eProposalType {
  REPUTATION_REWARD = "REPUTATION_REWARD",
}

export interface IMembersDaoWithReputation {
  member: tEthereumAddress
  reputation: tStringCurrencyUnits
}

export interface IVoteData {
  vote: eVote
  reputation: tStringCurrencyUnits
}

export interface IVoterData {
  voterAddress: tEthereumAddress
  voteData: IVoteData
}

export interface IProposalVotingMachineData {
  id: string
  type: eProposalType
  description: string
  status: eProposalStatus
  totalVotes: number
  yesVotes: number
  noVotes: number
  voters: IVoterData[]
}

export interface IContributionRewardProposalData
  extends IProposalVotingMachineData {
  reputationReward: tStringCurrencyUnits
  beneficiary: tEthereumAddress
  wizardIdBeneficiary: string
  executionTime: number
}

export interface ICowvenBasicData {
  id: string // orgName in the Avatar contract
  avatarAddress: tEthereumAddress
  description: string
  grate: eGrateType
  reputationAddress: tEthereumAddress
  tokenAddress: tEthereumAddress
}

export interface ICowvenData extends ICowvenBasicData {
  rank: number // Offchain calculation, comparing with the rest of DAOs
  score: number // Offchain calculation, from events from CheezeWizards tournaments
  members: IWizardData[] // Offchain calculation, from Reputation-related events
  wins: number // Offchain calculation, from events from CheezeWizards tournaments
  loses: number // Offchain calculation, from events from CheezeWizards tournaments
  proposals: IContributionRewardProposalData[]
}

export interface GrateData {
  id: eGrateType
  score: number
}

// Service to interact with the DAO part, both onchain and offchain part
export interface IDaoService {
  // Info getters
  getQuorumVoteAddress: () => tEthereumAddress
  getAllCowvensBasicData: () => Promise<ICowvenBasicData[]>
  getAllDaosInfo: () => Promise<ICowvenData[]>
  getAllMembersOfDao: (
    reputationAddress: tEthereumAddress,
  ) => Promise<IMembersDaoWithReputation[]>
  getAllWizardWalletsMembersOfDao: (
    reputationAddress: tEthereumAddress,
  ) => Promise<IWizardWalletDaoWithReputation[]>
  getDaoInfo: (cowvenBasicData: ICowvenBasicData) => Promise<ICowvenData>
  getReputationBalanceOf: (
    address: tEthereumAddress,
    reputationAddress: tEthereumAddress,
  ) => Promise<tStringCurrencyUnits>
  getAllContributionRewardProposalsByCowven: (
    avatarAddress: tEthereumAddress,
  ) => Promise<IContributionRewardProposalData[]>
  // Tx builders
  createProposalForReputationReward: (
    avatarAddress: tEthereumAddress,
    proposer: tEthereumAddress,
    benificiary: tEthereumAddress,
    reputationChange: tStringCurrencyUnits, // Change on Reputation for the recipient, can be negative
    daoTokenChange?: tStringCurrencyUnits,
  ) => Promise<IEthereumTransactionModel[]>
  voteProposal: (
    sender: tEthereumAddress, // Who sends the vote transaction
    voter: tEthereumAddress, // The voter (it's possible to vote on behalf of someone)
    proposalId: string,
    vote: eVote,
    reputationToUse: tStringCurrencyUnits, // If (-1), it will use all the owned reputation
  ) => Promise<IEthereumTransactionModel[]>
  redeemReputation: (
    avatarAddress: tEthereumAddress,
    redeemer: tEthereumAddress,
    proposalId: string,
  ) => Promise<IEthereumTransactionModel[]>
  deployNewCowven: (
    sender: tEthereumAddress,
    cowvenName: string,
    tokenCowvenname: string,
    tokenCowvenSymbol: string,
    description: string,
    initialFoundersRewards: string[][],
    grate: eGrateType,
  ) => Promise<IEthereumTransactionModel[]>
  initCowvenSchemes: (
    sender: tEthereumAddress,
    avatarAddress: tEthereumAddress,
    cowvenName: string,
    grate: eGrateStringIndex,
    description: string,
  ) => Promise<IEthereumTransactionModel[]>
}

export class DaoService extends ContractService implements IDaoService {
  private REPUTATION_DECIMALS = 18
  private DAO_TOKEN_DECIMALS = 18

  // ABIS

  private getReputationABI = (): any[] =>
    require(`${rootPath}/build/contracts/Reputation.json`).abi

  private getContributionRewardABI = (): any[] =>
    require(`${rootPath}/build/contracts/ContributionReward.json`).abi

  private getQuorumVoteABI = (): any[] =>
    require(`${rootPath}/build/contracts/QuorumVote.json`).abi

  private getDaoCreatorABI = (): any[] =>
    require(`${rootPath}/build/contracts/DaoCreator.json`).abi

  private getAvatarABI = (): any[] =>
    require(`${rootPath}/build/contracts/Avatar.json`).abi

  // ADDRESSES

  private getDaoCreatorAddress = (): tEthereumAddress =>
    getConfiguration().addresses.DaoCreator

  private getContributionRewardAddress = (): tEthereumAddress =>
    getConfiguration().addresses.ContributionReward

  // CONTRACTS OBJECTS

  private getReputationContract = (
    address: tEthereumAddress,
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<Reputation>(
      web3ProviderType,
      this.getReputationABI(),
      address,
    )

  private getAvatarContract = (
    address: tEthereumAddress,
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<Avatar>(
      web3ProviderType,
      this.getAvatarABI(),
      address,
    )

  private getContributionRewardContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<ContributionReward>(
      web3ProviderType,
      this.getContributionRewardABI(),
      this.getContributionRewardAddress(),
    )

  public getQuorumVoteContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<QuorumVote>(
      web3ProviderType,
      this.getQuorumVoteABI(),
      this.getQuorumVoteAddress(),
    )

  private getDaoCreatorContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<DaoCreator>(
      web3ProviderType,
      this.getDaoCreatorABI(),
      this.getDaoCreatorAddress(),
    )

  // INFORMATION PROVIDER METHODS

  private getRawReputationBalanceOf = async (
    address: tEthereumAddress,
    reputationAddress: tEthereumAddress,
  ): Promise<tBigNumberDecimalUnits> =>
    bnToBigNumber(
      await this.getReputationContract(reputationAddress)
        .methods.balanceOf(address)
        .call(),
    )

  private getRawReputationTotalSupply = async (
    reputationAddress: tEthereumAddress,
  ): Promise<tBigNumberDecimalUnits> =>
    bnToBigNumber(
      await this.getReputationContract(reputationAddress)
        .methods.totalSupply()
        .call(),
    )

  private getReputationTotalSupply = async (
    reputationAddress: tEthereumAddress,
  ): Promise<tStringCurrencyUnits> =>
    decimalsToCurrencyUnits(
      await this.getRawReputationTotalSupply(reputationAddress),
      this.REPUTATION_DECIMALS,
    )

  private getAllMintReputationEvents = async (
    reputationAddress: tEthereumAddress,
  ): Promise<EventData[]> =>
    await this.getReputationContract(reputationAddress).getPastEvents(
      eReputationEvents.Mint,
      {
        fromBlock: 0,
      },
    )

  private getAllBurnReputationEvents = async (
    reputationAddress: tEthereumAddress,
  ): Promise<EventData[]> =>
    await this.getReputationContract(reputationAddress).getPastEvents(
      eReputationEvents.Burn,
      {
        fromBlock: 0,
      },
    )

  private getAllNewContributionProposalEvents = async (
    avatarAddress: tEthereumAddress,
  ): Promise<EventData[]> =>
    await this.getContributionRewardContract().getPastEvents(
      eContributionRewardEvent.NewContributionProposal,
      {fromBlock: 0, filter: {_avatar: avatarAddress}},
    )

  private getAllRedeemReputationEvents = async (): Promise<EventData[]> =>
    await this.getContributionRewardContract().getPastEvents(
      eContributionRewardEvent.RedeemReputation,
      {fromBlock: 0},
    )

  getQuorumVoteAddress = (): tEthereumAddress =>
    getConfiguration().addresses.QuorumVote

  getReputationBalanceOf = async (
    address: tEthereumAddress,
    reputationAddress: tEthereumAddress,
  ): Promise<tStringCurrencyUnits> =>
    decimalsToCurrencyUnits(
      await this.getRawReputationBalanceOf(address, reputationAddress),
      this.REPUTATION_DECIMALS,
    )

  private getVoteProposalEventsByProposal = async (proposalId: string) =>
    (await this.getQuorumVoteContract().getPastEvents(
      eQuorumVoteEvents.VoteProposal,
      {fromBlock: 0},
    )).filter(event => event.returnValues[0] === proposalId)

  // TODO: refactor and optimize this, completely unordered and unefficient
  private getProposalVotingMachineData = async (
    proposalId: string,
  ): Promise<IProposalVotingMachineData> => {
    const [
      rawProposalVotingMachineData,
      voteProposalEventsByProposal,
      allRedeemReputationEvents,
    ] = await Promise.all([
      this.getQuorumVoteContract()
        .methods.proposals(proposalId)
        .call(),
      this.getVoteProposalEventsByProposal(proposalId),
      this.getAllRedeemReputationEvents(),
    ])

    const voters: IVoterData[] = voteProposalEventsByProposal.map(event => ({
      voterAddress: event.returnValues[2],
      voteData: {
        vote:
          bnToBigNumber(event.returnValues[3]).toNumber() === eVote.YES
            ? eVote.YES
            : bnToBigNumber(event.returnValues[3]).toNumber() === eVote.NO
            ? eVote.YES
            : eVote.ABSTAIN,
        reputation: decimalsToCurrencyUnits(
          bnToBigNumber(event.returnValues[4]),
          this.REPUTATION_DECIMALS,
        ),
      },
    }))

    const [
      countYes,
      countNo,
      countAbstain,
    ] = voteProposalEventsByProposal.reduce(
      ([countYes, countNo, countAbstain], currentEvent) =>
        bnToBigNumber(currentEvent.returnValues[3]).toNumber() === eVote.YES
          ? [countYes + 1, countNo, countAbstain]
          : bnToBigNumber(currentEvent.returnValues[3]).toNumber() === eVote.NO
          ? [countYes, countNo + 1, countAbstain]
          : [countYes, countNo, countAbstain + 1],
      [0, 0, 0],
    )

    const status = rawProposalVotingMachineData.open
      ? eProposalStatus.Voting
      : allRedeemReputationEvents.find(
          eventData => eventData.returnValues._proposalId === proposalId,
        )
      ? eProposalStatus.Redeemed
      : eProposalStatus.Redeemable

    return {
      id: proposalId,
      type: eProposalType.REPUTATION_REWARD,
      description: "Give/take some reputation to/from the beneficiary", // TODO unmock
      status,
      totalVotes: voteProposalEventsByProposal.length,
      yesVotes: countYes,
      noVotes: countNo,
      voters,
    }
  }

  getAllContributionRewardProposalsByCowven = async (
    avatarAddress: tEthereumAddress,
  ): Promise<IContributionRewardProposalData[]> => {
    const allContributionRewardsProposalEvents = await this.getAllNewContributionProposalEvents(
      avatarAddress,
    )
    const allWizardWalletsCreated = await new WizardsService().getAllWizardWalletsCreated()
    const allContributionRewardsProposals: IContributionRewardProposalData[] = []
    for (const {returnValues} of allContributionRewardsProposalEvents) {
      const proposalVotingMachineData = await this.getProposalVotingMachineData(
        returnValues[1],
      )
      const wizardData = allWizardWalletsCreated.find(
        wizard => wizard.wizardWallet === returnValues[7],
      )
      allContributionRewardsProposals.push({
        ...proposalVotingMachineData,
        reputationReward: decimalsToCurrencyUnits(
          bnToBigNumber(returnValues[4]),
          this.REPUTATION_DECIMALS,
        ),
        beneficiary: returnValues[7],
        wizardIdBeneficiary: wizardData ? wizardData.wizardId : "-1",
        executionTime: 0, // TODO unmock
      })
    }
    return allContributionRewardsProposals
  }

  // All the ethereum addresses which currenctly hold reputation with their reputation
  getAllMembersOfDao = async (
    reputationAddress: tEthereumAddress,
  ): Promise<IMembersDaoWithReputation[]> => {
    const mintEvents = await this.getAllMintReputationEvents(reputationAddress)
    const burnEvents = await this.getAllBurnReputationEvents(reputationAddress)
    const uniqueReputationHoldersAddresses = Array.from(
      new Set(mintEvents.map(eventData => eventData.returnValues._to)),
    )
    const reputationHoldersAndReputation: IMembersDaoWithReputation[] = []
    for (const reputationHolder of uniqueReputationHoldersAddresses) {
      const mintedAmountsToHolder = mintEvents
        .filter(eventData => eventData.returnValues._to === reputationHolder)
        .map(eventData => eventData.returnValues._amount)
      const totalMintedAmount: BigNumber = mintedAmountsToHolder.reduce(
        (accum: BigNumber, currentAmount: BigNumber) =>
          accum.plus(currentAmount),
        new BigNumber(0),
      )
      const burnedAmountsFromHolder = burnEvents
        .filter(eventData => eventData.returnValues._from === reputationHolder)
        .map(eventData => eventData.returnValues._amount)
      const totalBurnedAmount: BigNumber = burnedAmountsFromHolder.reduce(
        (accum: BigNumber, currentAmount: BigNumber) =>
          accum.plus(currentAmount),
        new BigNumber(0),
      )
      reputationHoldersAndReputation.push({
        member: reputationHolder,
        reputation: decimalsToCurrencyUnits(
          totalMintedAmount.minus(totalBurnedAmount),
          18,
        ),
      })
    }
    return reputationHoldersAndReputation
  }

  // From all the ethereum addresses which currently hold reputation, get only those that are wizard wallets
  getAllWizardWalletsMembersOfDao = async (
    reputationAddress: tEthereumAddress,
  ): Promise<IWizardWalletDaoWithReputation[]> => {
    const allWizardWalletsCreated = await new WizardsService().getAllWizardWalletsCreated()
    const allMembersOfDao = await this.getAllMembersOfDao(reputationAddress)

    return allMembersOfDao.reduce(
      (
        accum: IWizardWalletDaoWithReputation[],
        memberDao: IMembersDaoWithReputation,
      ) => {
        const index = allWizardWalletsCreated.findIndex(
          wizardWallet => wizardWallet.wizardWallet === memberDao.member,
        )
        if (index !== -1) {
          accum.push({
            ...memberDao,
            wizardId: allWizardWalletsCreated[index].wizardId,
          })
        }
        return accum
      },
      [],
    )
  }

  getAllCowvensBasicData = async (): Promise<ICowvenBasicData[]> => {
    const allAvatarAddressesCreated: tEthereumAddress[] = (await (await this.getDaoCreatorContract()).getPastEvents(
      eDaoCreatorEvents.NewOrg,
      {fromBlock: 0},
    )).map(({returnValues}: EventData) => returnValues._avatar)

    const cowvensBasicData: ICowvenBasicData[] = []
    for (const avatarAddress of allAvatarAddressesCreated) {
      cowvensBasicData.push(
        (await (await this.getAvatarContract(avatarAddress)).getPastEvents(
          eAvatarEvents.MetaData,
          {fromBlock: 0},
        )).map(({returnValues: {_metaData}}: EventData) => {
          const splittedMetadata: string[] = (<string>_metaData).split(
            METADATA_SEPARATOR,
          )

          return {
            id: splittedMetadata && splittedMetadata[0],
            avatarAddress,
            grate:
              splittedMetadata &&
              <eGrateType>getKeyByValue(eGrateStringIndex, splittedMetadata[1]),
            description: splittedMetadata && splittedMetadata[2],
            reputationAddress: splittedMetadata && splittedMetadata[3],
            tokenAddress: splittedMetadata && splittedMetadata[4],
          }
        })[0] || {avatarAddress},
      )
    }

    return cowvensBasicData
  }

  getAllDaosInfo = async (): Promise<ICowvenData[]> => {
    const allDaosInfo: ICowvenData[] = []
    for (const cowvenBasicData of await this.getAllCowvensBasicData()) {
      allDaosInfo.push(await this.getDaoInfo(cowvenBasicData))
    }
    return allDaosInfo
  }

  getDaoInfo = async (
    cowvenBasicData: ICowvenBasicData,
  ): Promise<ICowvenData> => {
    const {
      id,
      avatarAddress,
      grate,
      description,
      reputationAddress,
      tokenAddress,
    } = cowvenBasicData
    const wizardsService = new WizardsService()
    const wizardsMembersOfDao: IWizardData[] = []
    for (const wizardWallet of await this.getAllWizardWalletsMembersOfDao(
      reputationAddress,
    )) {
      wizardsMembersOfDao.push(
        await wizardsService.getWizardData(parseInt(wizardWallet.wizardId)),
      )
    }

    return {
      id,
      avatarAddress,
      description,
      reputationAddress: reputationAddress,
      tokenAddress: tokenAddress,
      rank: 0, // TODO: unmock
      score: 0, // TODO: unmock
      members: wizardsMembersOfDao,
      wins: 0, // TODO: unmock
      loses: 0, // TODO: unmock
      grate,
      proposals: await this.getAllContributionRewardProposalsByCowven(
        avatarAddress,
      ),
    }
  }

  // TODO: Review parameters
  createProposalForReputationReward = async (
    avatarAddress: tEthereumAddress,
    proposer: tEthereumAddress,
    benificiary: tEthereumAddress,
    reputationChange: tStringCurrencyUnits, // Change on Reputation for the recipient, can be negative
    daoTokenChange?: tStringCurrencyUnits,
  ): Promise<IEthereumTransactionModel[]> => [
    await this.txTo(this.getContributionRewardAddress(), {
      from: proposer,
      data: this.getContributionRewardContract()
        .methods.proposeContributionReward(
          avatarAddress,
          eProposalDescription.MINT_REPUTATION,
          currencyUnitsToDecimals(
            stringToBigNumber(reputationChange),
            this.REPUTATION_DECIMALS,
          ),
          [
            daoTokenChange
              ? currencyUnitsToDecimals(
                  stringToBigNumber(daoTokenChange),
                  this.DAO_TOKEN_DECIMALS,
                )
              : 0,
            0,
            0,
            0,
            1,
          ],
          ADDRESS_0x0,
          benificiary,
        )
        .encodeABI(),
    }),
  ]

  voteProposal = async (
    sender: tEthereumAddress, // Who sends the vote transaction
    voter: tEthereumAddress, // The voter (it's possible to vote on behalf of someone)
    proposalId: string,
    vote: eVote,
    reputationToUse: tStringCurrencyUnits, // If (-1), it will use all the owned reputation
  ): Promise<IEthereumTransactionModel[]> => {
    const convertedReputation =
      reputationToUse === "-1"
        ? "0"
        : currencyUnitsToDecimals(
            stringToBigNumber(reputationToUse),
            this.REPUTATION_DECIMALS,
          )

    return [
      await this.txTo(this.getQuorumVoteAddress(), {
        from: sender,
        data: this.getQuorumVoteContract()
          .methods.vote(proposalId, vote, convertedReputation, voter)
          .encodeABI(),
      }),
    ]
  }

  // TODO check it. The redeem can be done directly from any address, but still
  redeemReputation = async (
    avatarAddress: tEthereumAddress,
    redeemer: tEthereumAddress,
    proposalId: string,
  ): Promise<IEthereumTransactionModel[]> => [
    await this.txTo(this.getContributionRewardAddress(), {
      from: redeemer,
      data: this.getContributionRewardContract()
        .methods.redeemReputation(proposalId, avatarAddress)
        .encodeABI(),
    }),
  ]

  deployNewCowven = async (
    sender: tEthereumAddress,
    cowvenName: string,
    tokenCowvenname: string,
    tokenCowvenSymbol: string,
    description: string,
    initialFoundersRewards: string[][],
    grate: eGrateType,
  ): Promise<IEthereumTransactionModel[]> => [
    await this.txTo(this.getDaoCreatorAddress(), {
      from: sender,
      data: this.getDaoCreatorContract()
        .methods.forgeOrg(
          cowvenName,
          tokenCowvenname,
          tokenCowvenSymbol,
          initialFoundersRewards.map(tuple => tuple[0]),
          initialFoundersRewards.map(tuple => tuple[1]),
          eGrateStringIndex[grate],
          description,
        )
        .encodeABI(),
    }),
  ]

  initCowvenSchemes = async (
    sender: tEthereumAddress,
    avatarAddress: tEthereumAddress,
    cowvenName: string,
    grate: eGrateStringIndex,
    description: string,
  ): Promise<IEthereumTransactionModel[]> => {
    const {
      defaultDaoParams: {DefaultSchemes, SchemesParams, DefaultPermissions},
    } = getConfiguration()

    const avatarInstance = this.getAvatarContract(avatarAddress)
    const reputationAddress = await avatarInstance.methods
      .nativeReputation()
      .call()
    const nativeTokenAddress = await avatarInstance.methods.nativeToken().call()

    return [
      await this.txTo(this.getDaoCreatorAddress(), {
        from: sender,
        data: this.getDaoCreatorContract()
          .methods.setSchemes(
            avatarAddress,
            DefaultSchemes,
            SchemesParams,
            DefaultPermissions,
            `${cowvenName}${METADATA_SEPARATOR}${grate}${METADATA_SEPARATOR}${description}${METADATA_SEPARATOR}${reputationAddress}${METADATA_SEPARATOR}${nativeTokenAddress}`,
          )
          .encodeABI(),
      }),
    ]
  }
}
