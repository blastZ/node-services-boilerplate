import bcrypt from 'bcrypt';
import { ParameterizedContext } from 'koa';

import { User } from '../../models/User';

type Body = {
  name: string;
  password: string;
};

export = async (ctx: ParameterizedContext<State, Custom>) => {
  const { name, password: originPwd } = ctx.state.body as Body;

  const password = await bcrypt.hash(originPwd, 10);

  await User.create({
    name,
    password
  });

  return ctx.ok(undefined, 'Register success');
};
