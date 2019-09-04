import Redis from 'ioredis';

export const getRedis = () =>
  new Redis({
    host: 'redis',
    retryStrategy(times: number): number {
      return Math.max(times * 100, 3000);
    },
  });

const cacheRedis = getRedis();

const CACHE_PREFIX = 'CACHE';

export const getCacheData = async (key: string): Promise<any> => {
  return await cacheRedis.get(`${CACHE_PREFIX}:${key}`);
};

export const setCacheData = async (key: string, value: any): Promise<any> => {
  return await cacheRedis.set(`${CACHE_PREFIX}:${key}`, value);
};
