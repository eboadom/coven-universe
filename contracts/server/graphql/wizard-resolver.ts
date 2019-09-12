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
  WizardsService
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
  affinity: string;
  @Field()
  score?: string;
  @Field()
  cowvenName?: string;
  @Field()
  cowvenAddress?: tEthereumAddress;
  @Field()
  status: eWizardStatus;
  @Field(type => WizardWalletData)
  wizardWalletData: WizardWalletData

}

@InputType()
class WizardDataInput {
  @Field()
  @Min(0)
  @IsInt()
  wizardId: number;
}

@InputType()
class CreateWizardWalletInput extends WizardDataInput{
  @Field()
  @IsEthAddress()
  userWallet: tEthereumAddress;
}

@Resolver()
export class WizardResolver {
  private wizardsService: WizardsService;
  constructor() {
    this.wizardsService = new WizardsService();
  }

  @Query(returns => WizardData)
  async allWizardsByOwnerAddress(
    @Arg('data') { wizardId }: WizardDataInput
  ): Promise<WizardData> {
    return await this.wizardsService.getWizardData(wizardId)
  }

  @Mutation(returns => EthereumTransactionModel)
  async createWalletForWizard(
    @Arg('data') {userWallet, wizardId}: CreateWizardWalletInput,
  ): Promise<EthereumTransactionModel> {
    return await this.wizardsService.createWalletForWizard(userWallet, wizardId);
  }
}
