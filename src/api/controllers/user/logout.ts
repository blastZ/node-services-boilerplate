import { Context } from '@blastz/nico/typings';

import { State, Custom } from '../../../typings/koa';

export = async (ctx: Context<State, Custom>) => {
  ctx.cookies.set('token');

  return ctx.ok(undefined, 'Logout success');
};
