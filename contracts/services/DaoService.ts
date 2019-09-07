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
import {Avatar} from "../types/web3-contracts/Avatar"
import {Reputation} from "../types/web3-contracts/Reputation"
import {ContributionReward} from "../types/web3-contracts/ContributionReward"
import {QuorumVote} from "../types/web3-contracts/QuorumVote"
import {EventData} from "web3-eth-contract"

export enum eVote {
  ABSTAIN = 0,
  YES = 1,
  NO = 2,
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
}

export enum eProposalDescription {
  MINT_REPUTATION = "MINT_REPUTATION",
}

export interface ICowvenData {
  id: string // orgName in the Avatar contract
  avatarAddress: tEthereumAddress
  description: string // the Avatar will contain an IPFS-compatible hash which will have the description. Initially the description can be in the backend
  rank: number // Offchain calculation, comparing with the rest of DAOs
  score: number // Offchain calculation, from events from CheezeWizards tournaments
  members: number // Offchain calculation, from Reputation-related events
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
  getDaoInfo: (
    daoId: string,
    daoAddress?: tEthereumAddress,
  ) => Promise<ICowvenData>
  getReputationTotalSupply: () => Promise<tStringCurrencyUnits>
  getReputationBalanceOf: (
    address: tEthereumAddress,
  ) => Promise<tStringCurrencyUnits>
  getCreatedContributionsProposalsFromEvents: () => Promise<EventData[]>
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
}

export class DaoService extends ContractService implements IDaoService {
  private REPUTATION_DECIMALS = 18
  private DAO_TOKEN_DECIMALS = 18

  private getAvatarABI = (): any[] =>
    require(`${rootPath}/build/contracts/Avatar.json`).abi

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

  private getAvatarContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<Avatar>(
      web3ProviderType,
      this.getAvatarABI(),
      this.getAvatarAddress(),
    )

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

  getAvatarAddress = (): tEthereumAddress =>
    getConfiguration().addresses.WizardGuild

  getReputationTotalSupply = async (): Promise<tStringCurrencyUnits> =>
    decimalsToCurrencyUnits(
      await this.getRawReputationTotalSupply(),
      this.REPUTATION_DECIMALS,
    )

  getReputationBalanceOf = async (
    address: tEthereumAddress,
  ): Promise<tStringCurrencyUnits> =>
    decimalsToCurrencyUnits(
      await this.getRawReputationBalanceOf(address),
      this.REPUTATION_DECIMALS,
    )

  getDaoInfo = async (
    daoId: string,
    daoAddress?: tEthereumAddress,
  ): Promise<ICowvenData> => {
    return {
      id: daoId,
      avatarAddress: daoAddress ? daoAddress : ADDRESS_0x0, // TODO: unmock second case
      description: "", // TODO: unmock
      rank: -1, // TODO: unmock
      score: -1, // TODO: unmock
      members: -1, // TODO: unmock
      wins: 0, // TODO: unmock
      loses: 0, // TODO: unmock
      grate: eGrateType.MOLD, // TODO: unmock
    }
  }

  getCreatedContributionsProposalsFromEvents = async (): Promise<
    EventData[]
  > => {
    return await this.getContributionRewardContract().getPastEvents(
      eContributionRewardEvent.NewContributionProposal,
      {fromBlock: 0},
    )
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
    redeemer: tEthereumAddress, // Who is going to redeem the reputation
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
