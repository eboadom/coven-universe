import { RedisPubSub } from 'graphql-redis-subscriptions';

import { getRedis } from '../helpers/redis';

export const pubSub = new RedisPubSub({
  publisher: getRedis(),
  subscriber: getRedis(),
});
