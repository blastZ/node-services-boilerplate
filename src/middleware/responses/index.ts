import { Context, Next } from 'koa';

import ok from '../../api/responses/ok';
import bad from '../../api/responses/bad';
import unAuth from '../../api/responses/unAuth';

export = () => {
  return async (ctx: Context, next: Next) => {
    ctx.ok = ok;
    ctx.bad = bad;
    ctx.unAuth = unAuth;

    await next();
  };
};
