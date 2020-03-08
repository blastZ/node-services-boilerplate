import { ParameterizedContext } from 'koa';

export = async (ctx: ParameterizedContext<State, Custom>) => {
  return ctx.ok(ctx.state.user);
};
