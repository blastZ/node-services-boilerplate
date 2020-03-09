import { ParameterizedContext } from 'koa';

export = async (ctx: ParameterizedContext<State, Custom>) => {
  ctx.cookies.set('token');

  return ctx.ok(undefined, 'Logout success');
};
