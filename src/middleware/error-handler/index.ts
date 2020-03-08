import { Context, Next } from 'koa';

export = () => {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      return ctx.ok(undefined, err.message, false);
    }
  };
};
