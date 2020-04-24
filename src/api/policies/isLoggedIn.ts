import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

export = async (ctx: Context, next: Next) => {
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
