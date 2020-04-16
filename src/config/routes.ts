import { ConfigRoutes } from '@blastz/nico/typings';
import Joi from '@blastz/nico-utility/joi';

import isLoggedIn from '../api/policies/isLoggedIn';
import { State, Custom } from '../typings/koa';

const policies = [isLoggedIn];

const prefix = (method: string, route: string) => method + ' ' + route;

const config: ConfigRoutes<State, Custom> = {
  // user routes
  [prefix('GET', '/user')]: {
    controller: require(`../api/controllers/user/get`),
    policies
  },
  [prefix('POST', '/user')]: {
    controller: require(`../api/controllers/user/create`),
    bodyParser: true,
    validate: {
      body: Joi.object({
        name: Joi.string().trim().required().min(4).max(16),
        password: Joi.string().trim().required().min(8).max(16)
      })
    }
  },
  [prefix('POST', '/user/login')]: {
    controller: require(`../api/controllers/user/login`),
    bodyParser: true,
    validate: {
      body: Joi.object({
        name: Joi.string().trim().required(),
        password: Joi.string().trim().required()
      })
    }
  },
  [prefix('POST', '/user/logout')]: {
    controller: require('../api/controllers/user/logout'),
    policies
  }
};

export = config;
