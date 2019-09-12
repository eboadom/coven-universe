import {
  ContractService,
  EWeb3ProviderType,
  IEthereumTransactionModel,
} from "./ContractService"
import {tEthereumAddress, getConfiguration} from "../server/configuration"
import {
  bnToBigNumber,
  tStringCurrencyUnits,
  decimalsToCurrencyUnits,
  tBigNumberDecimalUnits,
  ADDRESS_0x0,
  currencyUnitsToDecimals,
  stringToBigNumber,
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
import {DAOName} from "../migrations/data/development-data"

export enum eVote {
  ABSTAIN = 0,
  YES = 1,
  NO = 2,
}

export enum eProposalStatus {
  Open = "Open",
  Closed = "Closed",
}

export enum eGrateType {
  BALANCE = "BALANCE",
  OCEAN = "OCEAN",
  STORM = "STORM",
  FLAME = "FLAME",
  MOLD = "MOLD",
}

export enum eContributionRewardEvent {
  NewContributionProposal = "NewContributionProposal",
  RedeemReputation = "RedeemReputation",
}

export enum eReputationEvents {
  Mint = "Mint",
  Burn = "Burn",
}

export enum eQuorumVoteEvents {
  VoteProposal = "VoteProposal",
}

export enum eProposalDescription {
  MINT_REPUTATION = "MINT_REPUTATION",
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
  executionTime: number
}

export interface ICowvenData {
  id: string // orgName in the Avatar contract
  avatarAddress: tEthereumAddress
  description: string // the Avatar will contain an IPFS-compatible hash which will have the description. Initially the description can be in the backend
  rank: number // Offchain calculation, comparing with the rest of DAOs
  score: number // Offchain calculation, from events from CheezeWizards tournaments
  members: IWizardData[] // Offchain calculation, from Reputation-related events
  wins: number // Offchain calculation, from events from CheezeWizards tournaments
  loses: number // Offchain calculation, from events from CheezeWizards tournaments
  grate: eGrateType // Custom field in the Avatar contract (TODO)
}

export interface GrateData {
  id: eGrateType
  score: number
}

// Service to interact with the DAO part, both onchain and offchain part
export interface IDaoService {
  // Info getters
  getAvatarAddress: () => tEthereumAddress
  getAllDaosIds: () => Promise<string[]>
  getAllDaosInfo: () => Promise<ICowvenData[]>
  getAllMembersOfDao: () => Promise<IMembersDaoWithReputation[]>
  getAllWizardWalletsMembersOfDao: () => Promise<
    IWizardWalletDaoWithReputation[]
  >
  getDaoInfo: (
    daoId: string,
    daoAddress?: tEthereumAddress,
  ) => Promise<ICowvenData>
  getReputationBalanceOf: (
    address: tEthereumAddress,
  ) => Promise<tStringCurrencyUnits>
  getAllContributionRewardProposals: () => Promise<
    IContributionRewardProposalData[]
  >
  // Tx builders
  createProposalForReputationReward: (
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
    redeemer: tEthereumAddress,
    proposalId: string,
  ) => Promise<IEthereumTransactionModel[]>
}

export class DaoService extends ContractService implements IDaoService {
  private REPUTATION_DECIMALS = 18
  private DAO_TOKEN_DECIMALS = 18

  private getReputationABI = (): any[] =>
    require(`${rootPath}/build/contracts/Reputation.json`).abi

  private getContributionRewardABI = (): any[] =>
    require(`${rootPath}/build/contracts/ContributionReward.json`).abi

  private getQuorumVoteABI = (): any[] =>
    require(`${rootPath}/build/contracts/QuorumVote.json`).abi

  private getReputationAddress = (): tEthereumAddress =>
    getConfiguration().addresses.Reputation

  private getContributionRewardAddress = (): tEthereumAddress =>
    getConfiguration().addresses.ContributionReward

  private getQuorumVoteAddress = (): tEthereumAddress =>
    getConfiguration().addresses.QuorumVote

  private getReputationContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<Reputation>(
      web3ProviderType,
      this.getReputationABI(),
      this.getReputationAddress(),
    )

  private getContributionRewardContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<ContributionReward>(
      web3ProviderType,
      this.getContributionRewardABI(),
      this.getContributionRewardAddress(),
    )

  private getQuorumVoteContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<QuorumVote>(
      web3ProviderType,
      this.getQuorumVoteABI(),
      this.getQuorumVoteAddress(),
    )

  private getRawReputationBalanceOf = async (
    address: tEthereumAddress,
  ): Promise<tBigNumberDecimalUnits> =>
    bnToBigNumber(
      await this.getReputationContract()
        .methods.balanceOf(address)
        .call(),
    )

  private getRawReputationTotalSupply = async (): Promise<
    tBigNumberDecimalUnits
  > =>
    bnToBigNumber(
      await this.getReputationContract()
        .methods.totalSupply()
        .call(),
    )

  private getReputationTotalSupply = async (): Promise<tStringCurrencyUnits> =>
    decimalsToCurrencyUnits(
      await this.getRawReputationTotalSupply(),
      this.REPUTATION_DECIMALS,
    )

  private getAllMintReputationEvents = async (): Promise<EventData[]> =>
    await this.getReputationContract().getPastEvents(eReputationEvents.Mint, {
      fromBlock: 0,
    })

  private getAllBurnReputationEvents = async (): Promise<EventData[]> =>
    await this.getReputationContract().getPastEvents(eReputationEvents.Burn, {
      fromBlock: 0,
    })

  private getCreatedContributionsProposalsFromEvents = async (): Promise<
    EventData[]
  > =>
    await this.getContributionRewardContract().getPastEvents(
      eContributionRewardEvent.NewContributionProposal,
      {fromBlock: 0},
    )

  getAvatarAddress = (): tEthereumAddress =>
    getConfiguration().addresses.WizardGuild

  getReputationBalanceOf = async (
    address: tEthereumAddress,
  ): Promise<tStringCurrencyUnits> =>
    decimalsToCurrencyUnits(
      await this.getRawReputationBalanceOf(address),
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
    const rawProposalVotingMachineData = await this.getQuorumVoteContract()
      .methods.proposals(proposalId)
      .call()
    const voteProposalEventsByProposal = await this.getVoteProposalEventsByProposal(
      proposalId,
    )

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
    return {
      id: proposalId,
      status: rawProposalVotingMachineData.open
        ? eProposalStatus.Open
        : eProposalStatus.Closed,
      totalVotes: voteProposalEventsByProposal.length,
      yesVotes: countYes,
      noVotes: countNo,
      voters,
    }
  }

  getAllContributionRewardProposals = async (): Promise<
    IContributionRewardProposalData[]
  > => {
    const allContributionRewardsProposalEvents = await this.getCreatedContributionsProposalsFromEvents()
    const allContributionRewardsProposals: IContributionRewardProposalData[] = []
    for (const {returnValues} of allContributionRewardsProposalEvents) {
      const proposalVotingMachineData = await this.getProposalVotingMachineData(
        returnValues[1],
      )
      allContributionRewardsProposals.push({
        ...proposalVotingMachineData,
        reputationReward: decimalsToCurrencyUnits(
          bnToBigNumber(returnValues[4]),
          this.REPUTATION_DECIMALS,
        ),
        beneficiary: returnValues[7],
        executionTime: 0, // TODO unmock
      })
    }
    return allContributionRewardsProposals
  }

  // All the ethereum addresses which currenctly hold reputation with their reputation
  getAllMembersOfDao = async (): Promise<IMembersDaoWithReputation[]> => {
    const mintEvents = await this.getAllMintReputationEvents()
    const burnEvents = await this.getAllBurnReputationEvents()
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
  getAllWizardWalletsMembersOfDao = async (): Promise<
    IWizardWalletDaoWithReputation[]
  > => {
    const allWizardWalletsCreated = await new WizardsService().getAllWizardWalletsCreated()
    const allMembersOfDao = await this.getAllMembersOfDao()

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

  getAllDaosIds = async (): Promise<string[]> => [DAOName] // TODO: unmock

  getAllDaosInfo = async (): Promise<ICowvenData[]> => {
    const allDaosInfo: ICowvenData[] = []
    for (const daoId of await this.getAllDaosIds()) {
      allDaosInfo.push(await this.getDaoInfo(daoId))
    }
    return allDaosInfo
  }

  getDaoInfo = async (
    daoId: string,
    daoAddress?: tEthereumAddress,
  ): Promise<ICowvenData> => {
    const wizardsService = new WizardsService()
    const wizardsMembersOfDao: IWizardData[] = []
    for (const wizardWallet of await this.getAllWizardWalletsMembersOfDao()) {
      wizardsMembersOfDao.push(
        await wizardsService.getWizardData(parseInt(wizardWallet.wizardId)),
      )
    }
    return {
      id: daoId,
      avatarAddress: daoAddress ? daoAddress : this.getAvatarAddress(), // TODO: adapt to multidao
      description: "", // TODO: unmock
      rank: 1, // TODO: unmock
      score: -1, // TODO: unmock
      members: wizardsMembersOfDao, // TODO: adapt to multi dao
      wins: 0, // TODO: unmock
      loses: 0, // TODO: unmock
      grate: eGrateType.MOLD, // TODO: unmock
    }
  }

  // TODO: Review parameters
  createProposalForReputationReward = async (
    proposer: tEthereumAddress,
    benificiary: tEthereumAddress,
    reputationChange: tStringCurrencyUnits, // Change on Reputation for the recipient, can be negative
    daoTokenChange?: tStringCurrencyUnits,
  ): Promise<IEthereumTransactionModel[]> => [
    await this.txTo(this.getContributionRewardAddress(), {
      from: proposer,
      data: this.getContributionRewardContract()
        .methods.proposeContributionReward(
          this.getAvatarAddress(),
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

  redeemReputation = async (
    redeemer: tEthereumAddress,
    proposalId: string,
  ): Promise<IEthereumTransactionModel[]> => [
    await this.txTo(this.getContributionRewardAddress(), {
      from: redeemer,
      data: this.getContributionRewardContract()
        .methods.redeemReputation(proposalId, this.getAvatarAddress())
        .encodeABI(),
    }),
  ]
}
