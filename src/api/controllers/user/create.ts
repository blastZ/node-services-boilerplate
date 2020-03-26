import bcrypt from 'bcrypt';
import { ParameterizedContext } from 'koa';

import { User } from '../../models/User';

type Body = {
  name: string;
  password: string;
};

export = async (ctx: ParameterizedContext<State, Custom>) => {
  const { name, password: originPwd } = ctx.state.body as Body;

  const user = await User.findOne({ name }).exec();
  if (user) {
    return ctx.ok(undefined, 'User already created');
  }

  const password = await bcrypt.hash(originPwd, 10);

  await User.create({
    name,
    password
  });

  return ctx.ok(undefined, 'Register success');
};
