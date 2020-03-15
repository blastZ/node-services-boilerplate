import { Redis } from 'ioredis';

declare global {
  namespace NodeJS {
    interface Global {
      redis: Redis;
    }
  }
}
