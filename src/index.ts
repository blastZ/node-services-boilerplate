import nico from '@blastz/nico';
import Mongo from '@blastz/nico-utility/mongo';
import mongoose from 'mongoose';
import { deepmerge } from '@blastz/nico/lib/utils/utility';

import defaultConfig from './config';
import { Config } from './typings/koa';

export = async (inputConfig: Config) => {
  const config: Config = deepmerge(defaultConfig, inputConfig);

  await Mongo.connect(mongoose, config.datastores.default.url);

  const app = nico.init(config);

  return app;
};
