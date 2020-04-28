import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import { Context } from '../../../typings/app';

type Body = {
  name: string;
  password: string;
};

export = async function userCreate(ctx: Context) {
  const { name, password: originPwd } = ctx.state.body as Body;

  const user = await User.findOne({ name }).exec();
  if (user) {
    return ctx.ok(undefined, 'User already created', false);
  }

  const password = await bcrypt.hash(originPwd, 10);

  await User.create({
    name,
    password
  });

  return ctx.ok(undefined, 'Register success');
};
