import Router from '@koa/router';
import Redis from 'ioredis';

interface Custom extends Router.RouterContext {
  ok(data?: any, message?: string, success?: boolean): void;
  bad(message?: string): void;
  unAuth(message?: string): void;
  redis?: Redis.Redis;
}

export = Custom;
