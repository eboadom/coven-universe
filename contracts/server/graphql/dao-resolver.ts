import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from "type-graphql"
import {
  DaoService,
  eGrateType,
  eVote,
  ICowvenData,
  eProposalType,
  IContributionRewardProposalData,
  eProposalStatus,
  IVoterData,
  IVoteData,
} from "../../services/DaoService"
import {tEthereumAddress} from "../configuration"
import {WizardData} from "./wizard-resolver"
import {IsEthAddress} from "./validators"
import {EthereumTransactionModel} from "./common-models"
import {tStringCurrencyUnits} from "../../utils/common-utils"
import {
  devFundReputation,
  devFundTokens,
} from "../../migrations/data/development-data"

registerEnumType(eGrateType, {
  name: "eGrateType",
  description: "Grate type options",
})

registerEnumType(eVote, {
  name: "eVote",
  description: "Vote options",
})

registerEnumType(eProposalType, {
  name: "eProposalType",
  description: "Proposal type options",
})

registerEnumType(eProposalStatus, {
  name: "eProposalStatus",
  description: "Proposal status options",
})

@ObjectType()
class VoteData implements IVoteData {
  @Field()
  vote: eVote

  @Field()
  reputation: tStringCurrencyUnits
}

@ObjectType()
class VoterData implements IVoterData {
  @Field()
  voterAddress: tEthereumAddress

  @Field(type => VoteData)
  voteData: VoteData
}

@ObjectType()
class ContributionRewardProposalData
  implements IContributionRewardProposalData {
  @Field()
  id: string

  @Field()
  type: eProposalType

  @Field()
  description: string

  @Field()
  status: eProposalStatus

  @Field()
  totalVotes: number

  @Field()
  yesVotes: number

  @Field()
  noVotes: number

  @Field(type => [VoterData])
  voters: VoterData[]

  @Field()
  reputationReward: tStringCurrencyUnits

  @Field()
  beneficiary: tEthereumAddress

  @Field()
  wizardIdBeneficiary: string

  @Field()
  executionTime: number
}

@ObjectType()
class CowvenData implements ICowvenData {
  @Field()
  id: string

  @Field()
  avatarAddress: tEthereumAddress

  @Field()
  description: string

  @Field()
  grate: eGrateType

  reputationAddress: tEthereumAddress
  tokenAddress: tEthereumAddress

  @Field()
  loses: number

  @Field(type => [WizardData])
  members: WizardData[]

  @Field()
  rank: number

  @Field()
  score: number

  @Field()
  wins: number

  @Field(type => [ContributionRewardProposalData])
  proposals: ContributionRewardProposalData[]
}

@InputType()
class DaoInfoInput {
  @Field()
  daoId: string

  @Field()
  @IsEthAddress()
  daoAddress: tEthereumAddress
}

@InputType()
class ReputationProposalInput {
  @Field()
  @IsEthAddress()
  avatarAddress: tEthereumAddress

  @Field()
  @IsEthAddress()
  proposer: tEthereumAddress

  @Field()
  @IsEthAddress()
  beneficiary: tEthereumAddress

  @Field()
  reputationChange: tStringCurrencyUnits

  @Field()
  daoTokenChange?: tStringCurrencyUnits
}

@InputType()
class VoteProposalInput {
  @Field()
  @IsEthAddress()
  sender: tEthereumAddress

  @Field()
  @IsEthAddress()
  voter: tEthereumAddress

  @Field()
  proposalId: string

  @Field(type => Int)
  vote: eVote

  @Field()
  reputationToUse: tStringCurrencyUnits
}

@InputType()
class RedeemReputationInput {
  @Field()
  @IsEthAddress()
  avatarAddress: tEthereumAddress

  @Field()
  @IsEthAddress()
  redeemer: tEthereumAddress

  @Field()
  proposalId: string
}

// TODO add input for initialFoundersRewards
@InputType()
class DeployNewCowvenInput {
  @Field()
  @IsEthAddress()
  sender: tEthereumAddress

  @Field()
  cowvenName: string

  @Field()
  tokenCowvenName: string

  @Field()
  tokenCowvenSymbol: string

  @Field()
  description: string

  @Field()
  grate: eGrateType
}

@InputType()
class InitCowvenSchemesInput {
  @Field()
  @IsEthAddress()
  sender: tEthereumAddress

  @Field()
  avatarAddress: tEthereumAddress
}

@Resolver()
export class DaoResolver {
  private daoService: DaoService
  constructor() {
    this.daoService = new DaoService()
  }

  @Query(returns => [CowvenData])
  async allDaosInfo(): Promise<CowvenData[]> {
    return await this.daoService.getAllDaosInfo()
  }

  // TODO: change because of the new params of getDaoInfo
  // @Query(returns => CowvenData)
  // async daoInfo(@Arg("data") {daoId, daoAddress}: DaoInfoInput): Promise<
  //   CowvenData
  // > {
  //   return await this.daoService.getDaoInfo(daoId, daoAddress)
  // }

  @Mutation(returns => [EthereumTransactionModel])
  async createProposalForReputationReward(@Arg("data")
  {
    avatarAddress,
    proposer,
    beneficiary,
    reputationChange,
    daoTokenChange,
  }: ReputationProposalInput): Promise<EthereumTransactionModel[]> {
    return await this.daoService.createProposalForReputationReward(
      avatarAddress,
      proposer,
      beneficiary,
      reputationChange,
      daoTokenChange,
    )
  }

  @Mutation(returns => [EthereumTransactionModel])
  async voteProposal(@Arg("data")
  {
    sender,
    voter,
    proposalId,
    vote,
    reputationToUse,
  }: VoteProposalInput): Promise<EthereumTransactionModel[]> {
    return await this.daoService.voteProposal(
      sender,
      voter,
      proposalId,
      vote,
      reputationToUse,
    )
  }

  @Mutation(returns => [EthereumTransactionModel])
  async redeemReputation(@Arg("data")
  {
    avatarAddress,
    redeemer,
    proposalId,
  }: RedeemReputationInput): Promise<EthereumTransactionModel[]> {
    return await this.daoService.redeemReputation(
      avatarAddress,
      redeemer,
      proposalId,
    )
  }

  @Mutation(returns => [EthereumTransactionModel])
  async deployNewCowven(@Arg("data")
  {
    sender,
    cowvenName,
    tokenCowvenName,
    tokenCowvenSymbol,
    description,
    grate,
  }: DeployNewCowvenInput): Promise<EthereumTransactionModel[]> {
    return await this.daoService.deployNewCowven(
      sender,
      cowvenName,
      tokenCowvenName,
      tokenCowvenSymbol,
      description,
      [[sender, devFundReputation, devFundTokens]],
      grate,
    )
  }

  @Mutation(returns => [EthereumTransactionModel])
  async initCowvenSchemes(@Arg("data")
  {
    sender,
    avatarAddress,
  }: InitCowvenSchemesInput): Promise<EthereumTransactionModel[]> {
    return await this.daoService.initCowvenSchemes(sender, avatarAddress)
  }
}
