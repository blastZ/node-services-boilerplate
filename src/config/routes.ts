import isLoggedIn from '../api/policies/isLoggedIn';
import { Application } from '../typings/app';

const policies = [isLoggedIn];

export = {
  // user routes
  'GET /user': {
    controller: require(`../api/controllers/user/get`),
    policies
  },
  'POST /user': {
    controller: require(`../api/controllers/user/create`),
    bodyParser: true
  },
  'POST /user/login': {
    controller: require(`../api/controllers/user/login`),
    bodyParser: true
  },
  'POST /user/logout': {
    controller: require('../api/controllers/user/logout'),
    policies
  }
} as Application.ConfigRoutes;
