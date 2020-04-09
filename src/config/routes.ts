import { ConfigRoutes } from '@blastz/nico/typings';
import Joi from '@blastz/nico/lib/utils/joi';

import isLoggedIn from '../api/policies/isLoggedIn';
import { State, Custom } from '../typings/koa';

const policies = [isLoggedIn];

const config: ConfigRoutes<State, Custom> = {
  // user routes
  'GET /user': {
    controller: require(`../api/controllers/user/get`),
    policies
  },
  'POST /user': {
    controller: require(`../api/controllers/user/create`),
    bodyParser: true,
    validate: {
      body: Joi.object({
        name: Joi.string().trim().required().min(4).max(16),
        password: Joi.string().trim().required().min(8).max(16)
      })
    }
  },
  'POST /user/login': {
    controller: require(`../api/controllers/user/login`),
    bodyParser: true,
    validate: {
      body: Joi.object({
        name: Joi.string().trim().required(),
        password: Joi.string().trim().required()
      })
    }
  },
  'POST /user/logout': {
    controller: require('../api/controllers/user/logout'),
    policies
  }
};

export = config;
