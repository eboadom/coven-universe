import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { ContractData } from './data-resolver';
import { ContractActions } from './actions-resolver';
import { pubSub } from './pubsub';

export const getSchema = async (): Promise<GraphQLSchema> => {
  return  await buildSchema({
    pubSub,
    resolvers: [ContractActions, ContractData],
  });
};
