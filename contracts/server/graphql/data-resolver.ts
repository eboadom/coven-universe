import {
  Query,
  Resolver,
} from 'type-graphql';

@Resolver()
export class ContractData {

  @Query(returns => String)
  async ping(): Promise<string> {
    return 'pong';
  }
}