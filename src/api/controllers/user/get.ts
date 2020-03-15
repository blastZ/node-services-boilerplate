import { ParameterizedContext } from 'koa';

export = async (ctx: ParameterizedContext<State, Custom>) => {
  global.redis.set('userInfo', JSON.stringify(ctx.state.user));

  return ctx.ok(ctx.state.user);
};
