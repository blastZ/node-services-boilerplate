import bcrypto from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ParameterizedContext } from 'koa';

import { User } from '../../models/User';

type Body = {
  name: string;
  password: string;
};

export = async (ctx: ParameterizedContext<State, Custom>) => {
  const { name, password } = ctx.state.body as Body;

  const user = await User.findOne({ name }).exec();

  if (!user) {
    return ctx.bad('User not found');
  }

  const match = await bcrypto.compare(password, user.password);

  if (!match) {
    return ctx.bad('Wrong name or password');
  }

  const token = jwt.sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600 }, 'jwt-secret');
  ctx.cookies.set('token', token);

  return ctx.ok(undefined, 'Login success');
};
