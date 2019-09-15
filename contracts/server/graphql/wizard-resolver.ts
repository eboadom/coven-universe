import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
  Int,
} from "type-graphql"
import {Min, IsInt} from "class-validator"
import {
  eWizardStatus,
  IWizardData,
  IWizardWalletData,
  WizardsService,
  eWizardAffinity,
} from "../../services/WizardsService"
import {tEthereumAddress} from "../configuration"
import {IsEthAddress} from "./validators"
import {EthereumTransactionModel} from "./common-models"
import {eVote} from "../../services/DaoService"
import {tStringCurrencyUnits} from "../../utils/common-utils"

registerEnumType(eWizardStatus, {
  name: "eWizardStatus",
  description: "Wizard status options",
})

@ObjectType()
class WizardWalletData implements IWizardWalletData {
  @Field()
  wizardWalletAddress: tEthereumAddress
  @Field()
  genecheezeDaoReputation: string
}
@ObjectType()
export class WizardData implements IWizardData {
  @Field()
  id: number
  @Field()
  owner: tEthereumAddress
  @Field()
  innatePower: string
  @Field()
  affinity: eWizardAffinity
  @Field({nullable: true})
  score?: string
  @Field({nullable: true})
  cowvenName?: string
  @Field({nullable: true})
  cowvenAddress?: tEthereumAddress
  @Field()
  status: eWizardStatus
  @Field(type => WizardWalletData)
  wizardWalletData: WizardWalletData
}

@InputType()
class WizardDataInput {
  @Field()
  @IsEthAddress()
  userWallet: string
}

@InputType()
class CreateWizardWalletInput extends WizardDataInput {
  @Field()
  @IsInt()
  @Min(0)
  wizardId: number
}
@InputType()
class VoteProposalWithWizardWalletInput {
  @Field()
  @IsEthAddress()
  sender: tEthereumAddress

  @Field()
  @IsEthAddress()
  wizardWalletAddress: tEthereumAddress

  @Field()
  proposalId: string

  @Field(type => Int)
  vote: eVote

  @Field()
  reputationToUse: tStringCurrencyUnits
}

@Resolver()
export class WizardResolver {
  private wizardsService: WizardsService
  constructor() {
    this.wizardsService = new WizardsService()
  }

  @Query(returns => [WizardData])
  async allWizardsDataByOwner(@Arg("data")
  {
    userWallet,
  }: WizardDataInput): Promise<WizardData[]> {
    return await this.wizardsService.getAllWizardsDataByOwner(userWallet)
  }

  @Mutation(returns => EthereumTransactionModel)
  async createWalletForWizard(@Arg("data")
  {
    userWallet,
    wizardId,
  }: CreateWizardWalletInput): Promise<EthereumTransactionModel> {
    return await this.wizardsService.createWalletForWizard(userWallet, wizardId)
  }

  @Mutation(returns => [EthereumTransactionModel])
  async voteProposalWithWizardWallet(@Arg("data")
  {
    sender,
    wizardWalletAddress,
    proposalId,
    vote,
    reputationToUse,
  }: VoteProposalWithWizardWalletInput): Promise<EthereumTransactionModel[]> {
    return await this.wizardsService.voteProposalWithWizardWallet(
      sender,
      wizardWalletAddress,
      proposalId,
      vote,
      reputationToUse,
    )
  }
}
