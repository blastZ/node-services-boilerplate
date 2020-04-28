import { Context } from '../../../typings/app';

export = async function userLogout(ctx: Context) {
  ctx.cookies.set('token');

  return ctx.ok(undefined, 'Logout success');
};
