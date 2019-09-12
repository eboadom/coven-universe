import { Field, ObjectType } from "type-graphql";
import { IEthereumTransactionModel } from "../../services/ContractService";

@ObjectType()
export class EthereumTransactionModel implements IEthereumTransactionModel {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field({ defaultValue: '' })
  data?: string;

  @Field({ defaultValue: '' })
  gas?: string;

  @Field({ defaultValue: '' })
  value?: string;
}
