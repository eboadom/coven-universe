import {
  Arg,
  Field,
  Mutation,
  Resolver,
  InputType,
} from 'type-graphql';

import {
  IsEthAddress,
  IsPositiveBigNumber,
} from './validators';

@InputType()
class ApproveInput {
  @Field()
  @IsEthAddress()
  userAddress: string;

  @Field()
  @IsEthAddress()
  reserve: string;
}


@InputType()
class TransferInput extends ApproveInput {
  @Field()
  @IsPositiveBigNumber()
  amount: string;
}

@Resolver()
export class ContractActions {
  @Mutation(returns => Number)
  async deposit(
    @Arg('data') data: TransferInput,
  ): Promise<number> {
    return 0;
  }


}
