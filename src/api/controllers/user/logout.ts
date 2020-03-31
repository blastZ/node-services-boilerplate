import { ParameterizedContext } from 'koa';

import Custom from '../../../typings/context.custom';

export = async (ctx: ParameterizedContext<State, Custom>) => {
  ctx.cookies.set('token');

  return ctx.ok(undefined, 'Logout success');
};
