import { ParameterizedContext } from 'koa';

import Custom from '../../../typings/context.custom';

export = async (ctx: ParameterizedContext<State, Custom>) => {
  return ctx.ok(ctx.state.user);
};
