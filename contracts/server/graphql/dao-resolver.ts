import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query, registerEnumType,
  Resolver
} from "type-graphql";
import { DaoService, eGrateType, eVote, ICowvenData } from "../../services/DaoService";
import { tEthereumAddress } from "../configuration";
import { WizardData } from "./wizard-resolver";
import { IsEthAddress } from "./validators";
import { EthereumTransactionModel } from "./common-models";
import { tStringCurrencyUnits } from "../../utils/common-utils";

registerEnumType(eGrateType, {
  name: 'eGrateType',
  description: 'Grate type options',
});

registerEnumType(eVote, {
  name: 'eVote',
  description: 'Vote options',
});

@ObjectType()
class CowvenData implements ICowvenData{
  @Field()
  avatarAddress: tEthereumAddress;

  @Field()
  description: string;

  @Field()
  grate: eGrateType;

  @Field()
  id: string;

  @Field()
  loses: number;

  @Field(type => [WizardData])
  members: WizardData[];

  @Field()
  rank: number;

  @Field()
  score: number;

  @Field()
  wins: number;

}

@InputType()
class DaoInfoInput {
  @Field()
  daoId: string;

  @Field()
  @IsEthAddress()
  daoAddress: tEthereumAddress;
}

@InputType()
class ReputationProposalInput {
  @Field()
  @IsEthAddress()
  proposer: tEthereumAddress;

  @Field()
  @IsEthAddress()
  beneficiary: tEthereumAddress;

  @Field()
  reputationChange: tStringCurrencyUnits;

  @Field()
  daoTokenChange?: tStringCurrencyUnits;
}

@InputType()
class VoteProposalInput {

  @Field()
  @IsEthAddress()
  sender: tEthereumAddress;

  @Field()
  @IsEthAddress()
  voter: tEthereumAddress;

  @Field()
  proposalId: string;

  @Field(type => Int)
  vote: eVote;

  @Field()
  reputationToUse: tStringCurrencyUnits;
}

@InputType()
class RedeemReputationInput {
  @Field()
  @IsEthAddress()
  redeemer: tEthereumAddress;

  @Field()
  proposalId: string
}

@Resolver()
export class DaoResolver {
  private daoService: DaoService;
  constructor() {
    this.daoService = new DaoService();
  }

  @Query(returns => [CowvenData])
  async allDaosInfo(): Promise<CowvenData[]> {
    return await this.daoService.getAllDaosInfo()
  }

  @Query(returns => CowvenData)
  async daoInfo(
    @Arg('data') { daoId, daoAddress }: DaoInfoInput
  ): Promise<CowvenData> {
    return await this.daoService.getDaoInfo(daoId, daoAddress)
  }

  @Mutation(returns => [EthereumTransactionModel])
  async createProposalForReputationReward(
    @Arg('data') {
      proposer, beneficiary, reputationChange, daoTokenChange
    }: ReputationProposalInput,
  ): Promise<EthereumTransactionModel[]> {
    return await this.daoService.createProposalForReputationReward(
      proposer,
      beneficiary,
      reputationChange,
      daoTokenChange
    );
  }

  @Mutation(returns => [EthereumTransactionModel])
  async voteProposal(
    @Arg('data') {
      sender,
      voter,
      proposalId,
      vote,
      reputationToUse,
    }: VoteProposalInput,
  ): Promise<EthereumTransactionModel[]> {
    return await this.daoService.voteProposal(
      sender,
      voter,
      proposalId,
      vote,
      reputationToUse,
    );
  }

  @Mutation(returns => [EthereumTransactionModel])
  async redeemReputation(
    @Arg('data') {
      redeemer,
      proposalId,
    }: RedeemReputationInput,
  ): Promise<EthereumTransactionModel[]> {
    return await this.daoService.redeemReputation(redeemer, proposalId);
  }
}

