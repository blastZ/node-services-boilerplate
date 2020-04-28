import jwt from 'jsonwebtoken';
import { Context, Next } from '../../typings/app';

export = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('token');

  try {
    const decoded = jwt.verify(String(token), ctx.custom.JWT_SECRET) as { id: string };

    ctx.state.user = {
      id: decoded.id
    };

    await next();
  } catch (err) {
    return ctx.unAuth();
  }
};
