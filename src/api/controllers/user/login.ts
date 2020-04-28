import bcrypto from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models/User';
import { Context } from '../../../typings/app';

type Body = {
  name: string;
  password: string;
};

export = async function userLogin(ctx: Context) {
  const { name, password } = ctx.state.body as Body;

  const user = await User.findOne({ name }).exec();

  if (!user) {
    return ctx.bad('User not found');
  }

  const match = await bcrypto.compare(password, user.password);

  if (!match) {
    return ctx.bad('Wrong name or password');
  }

  const token = jwt.sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600 }, ctx.custom.JWT_SECRET);
  ctx.cookies.set('token', token);

  return ctx.ok(undefined, 'Login success');
};
