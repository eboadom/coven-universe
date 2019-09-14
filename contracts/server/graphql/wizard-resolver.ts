import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver
} from "type-graphql";
import { Min, IsInt } from "class-validator";
import {
  eWizardStatus,
  IWizardData,
  IWizardWalletData,
  WizardsService,
  eWizardAffinity
} from "../../services/WizardsService";
import { tEthereumAddress } from "../configuration";
import { IsEthAddress } from "./validators";
import { EthereumTransactionModel } from "./common-models";

registerEnumType(eWizardStatus, {
  name: 'eWizardStatus',
  description: 'Wizard status options',
});

@ObjectType()
class WizardWalletData implements IWizardWalletData {
  @Field()
  wizardWalletAddress: tEthereumAddress;
  @Field()
  genecheezeDaoReputation: string

}
@ObjectType()
export class WizardData implements IWizardData {
  @Field()
  id: number;
  @Field()
  owner: tEthereumAddress;
  @Field()
  innatePower: string;
  @Field()
  affinity: eWizardAffinity;
  @Field({nullable: true})
  score?: string;
  @Field({nullable: true})
  cowvenName?: string;
  @Field({nullable: true})
  cowvenAddress?: tEthereumAddress;
  @Field()
  status: eWizardStatus;
  @Field(type => WizardWalletData)
  wizardWalletData: WizardWalletData

}

@InputType()
class WizardDataInput {
  @Field()
  @IsEthAddress()
  userWallet : string;
}

@InputType()
class CreateWizardWalletInput extends WizardDataInput{
  @Field()
  @IsInt()
  @Min(0)
  wizardId: number;
}

@Resolver()
export class WizardResolver {
  private wizardsService: WizardsService;
  constructor() {
    this.wizardsService = new WizardsService();
  }

  @Query(returns => [WizardData])
  async allWizardsDataByOwner(
    @Arg('data') { userWallet }: WizardDataInput
  ): Promise<WizardData[]> {
    return await this.wizardsService.getAllWizardsDataByOwner(userWallet)
  }

  @Mutation(returns => EthereumTransactionModel)
  async createWalletForWizard(
    @Arg('data') {userWallet, wizardId}: CreateWizardWalletInput,
  ): Promise<EthereumTransactionModel> {
    return await this.wizardsService.createWalletForWizard(userWallet, wizardId);
  }
}
