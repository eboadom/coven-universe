import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { WizardResolver } from './wizard-resolver';
import { pubSub } from './pubsub';
import { DaoResolver } from "./dao-resolver";

export const getSchema = async (): Promise<GraphQLSchema> => {
  return  await buildSchema({
    pubSub,
    resolvers: [WizardResolver, DaoResolver],
  });
};
