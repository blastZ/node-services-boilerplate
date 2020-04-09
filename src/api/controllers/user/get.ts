import { Context } from '@blastz/nico/typings';

import { State, Custom } from '../../../typings/koa';

export = async (ctx: Context<State, Custom>) => {
  return ctx.ok(ctx.state.user);
};
