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
  eGrateStringIndex,
} from "../../services/DaoService"
import {tEthereumAddress} from "../configuration"
import {WizardData} from "./wizard-resolver"
import {IsEthAddress} from "./validators"
import {EthereumTransactionModel} from "./common-models"
import {tStringCurrencyUnits, ADDRESS_0x0} from "../../utils/common-utils"
import {
  devFundReputation,
  devFundTokens,
} from "../../migrations/data/development-data"
import {WizardsService} from "../../services/WizardsService"

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
}

@InputType()
class InitCowvenSchemesInput {
  @Field()
  @IsEthAddress()
  sender: tEthereumAddress

  @Field()
  avatarAddress: tEthereumAddress

  @Field()
  cowvenName: string

  @Field()
  description: string

  @Field()
  grate: eGrateType
}

@Resolver()
export class DaoResolver {
  private daoService: DaoService
  private wizardsService: WizardsService
  constructor() {
    this.daoService = new DaoService()
    this.wizardsService = new WizardsService()
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

  // TODO change the logic for the minting of initial reputation
  // The address of the wizard to give reputation should be received as parameter
  @Mutation(returns => [EthereumTransactionModel])
  async deployNewCowven(@Arg("data")
  {
    sender,
    cowvenName,
  }: DeployNewCowvenInput): Promise<EthereumTransactionModel[]> {
    const wizardsOfSender = await this.wizardsService.getAllWizardsDataByOwner(
      sender,
    )
    if (wizardsOfSender.length > 0) {
      const firstWizardOfSender = wizardsOfSender[0]
      if (
        firstWizardOfSender.wizardWalletData.wizardWalletAddress !== ADDRESS_0x0
      ) {
        const firstWizardWalletAddress =
          firstWizardOfSender.wizardWalletData.wizardWalletAddress
        return await this.daoService.deployNewCowven(
          sender,
          cowvenName,
          "CHZTK",
          "CHZTK",
          [[firstWizardWalletAddress, devFundReputation, devFundTokens]], // TODO review. For now the sender receives reputation and token
        )
      } else {
        throw new Error(
          "Error. The first wizard of the sender doesn't have a wallet",
        )
      }
    } else {
      throw new Error("Error. The sender doesn't have wizards")
    }
  }

  @Mutation(returns => [EthereumTransactionModel])
  async initCowvenSchemes(@Arg("data")
  {
    sender,
    avatarAddress,
    cowvenName,
    description,
    grate,
  }: InitCowvenSchemesInput): Promise<EthereumTransactionModel[]> {
    return await this.daoService.initCowvenSchemes(
      sender,
      avatarAddress,
      cowvenName,
      eGrateStringIndex[grate],
      description,
    )
  }
}
