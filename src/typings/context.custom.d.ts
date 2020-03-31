import Router from '@koa/router';
import Redis from 'ioredis';

import ok from '../api/responses/ok';
import bad from '../api/responses/bad';
import unAuth from '../api/responses/unAuth';

interface Custom extends Router.RouterContext {
  ok: typeof ok;
  bad: typeof bad;
  unAuth: typeof unAuth;
  redis?: Redis.Redis;
}

export = Custom;
