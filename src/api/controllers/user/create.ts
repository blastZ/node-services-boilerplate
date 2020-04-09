import bcrypt from 'bcrypt';
import { Context } from '@blastz/nico/typings';

import { User } from '../../models/User';
import { State, Custom } from '../../../typings/koa';

type Body = {
  name: string;
  password: string;
};

export = async (ctx: Context<State, Custom>) => {
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
