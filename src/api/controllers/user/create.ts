import bcrypt from 'bcrypt';
import { Context } from 'koa';

import { User } from '../../models/User';

export = async (ctx: Context) => {
  const { name, password: originPwd } = ctx.request.body;

  if (
    typeof name !== 'string' ||
    typeof originPwd !== 'string' ||
    name.trim() === '' ||
    originPwd.trim() === '' ||
    name.length > 24 ||
    originPwd.length < 8 ||
    originPwd.length > 16
  ) {
    return ctx.bad();
  }

  const password = await bcrypt.hash(originPwd, 10);

  await User.create({
    name,
    password
  });

  return ctx.ok(undefined, 'Register success');
};
