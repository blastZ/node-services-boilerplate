import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import debug from 'debug';

const log = debug('nico:policy');

export = async (ctx: Context, next: Next) => {
  log('isLoggedIn fired');
  const token = ctx.cookies.get('token');

  try {
    const decoded = <{ id: string }>jwt.verify(String(token), 'jwt-secret');

    ctx.state.user = {
      id: decoded.id
    };

    await next();
  } catch (err) {
    return ctx.unAuth();
  }
};
