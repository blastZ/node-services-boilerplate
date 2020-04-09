import nico from '@blastz/nico';
import { deepmerge } from '@blastz/nico/lib/utils/utility';
import { Config } from '@blastz/nico/typings';

import defaultConfig from './config';
import { Custom, State } from './typings/koa';

export = async (inputConfig: Config<State, Custom>) => {
  const config: Config<State, Custom> = deepmerge(defaultConfig, inputConfig);
  const app = await nico.init(config);

  return app;
};
