import { ConfigResponses } from '@blastz/nico/typings';

const config: ConfigResponses = {
  bad: require('../api/responses/bad'),
  unAuth: require('../api/responses/unAuth')
};

export = config;
