import { ParameterizedContext } from 'koa';

export = async (ctx: ParameterizedContext<State, Custom>) => {
  return ctx.ok(undefined, 'Logout success');
};
