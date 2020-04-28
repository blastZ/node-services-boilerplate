import { Context } from '../../../typings/app';

export = async function userGet(ctx: Context) {
  return ctx.ok(ctx.state.user);
};
