import request from 'supertest';
import mongoose from 'mongoose';

import init from '..';
import Application from '../typings/app';

let app: Application;
let agent: request.SuperTest<request.Test>;
const prefix = (route: string) => '/api/v1' + route;

beforeAll(async () => {
  app = await init({
    datastores: {
      default: {
        url: 'mongodb://root:admin123@localhost:27017/jest-test?authSource=admin'
      }
    }
  });
  const server = app.callback();
  await app.db.connect();
  await mongoose.connection.db.dropDatabase();
  agent = request.agent(server);
});

afterAll(async () => {
  await app.db.disconnect();
});

test('GET /user: need login', async () => {
  const response = await agent.get(prefix('/user'));
  expect(response.status).toEqual(401);
});

test('POST /user: correct params', async () => {
  const needName = await agent.post(prefix('/user')).send({});
  const nameLength = await agent.post(prefix('/user')).send({ name: 'roo' });
  const needPassword = await agent.post(prefix('/user')).send({ name: 'root' });
  const passwordLength = await agent.post(prefix('/user')).send({ name: 'root', password: '123' });

  expect(needName.body.success).toEqual(false);
  expect(nameLength.body.success).toEqual(false);
  expect(needPassword.body.success).toEqual(false);
  expect(passwordLength.body.success).toEqual(false);
});

test('POST /user: create user success', async () => {
  const response = await agent.post(prefix('/user')).send({ name: 'root', password: 'admin123' });

  expect(response.body.success).toEqual(true);
});

test('POST /user: name is unique', async () => {
  const response = await agent.post(prefix('/user')).send({ name: 'root', password: 'admin123' });

  expect(response.body.success).toEqual(false);
});

test('POST /user/login: login success', async () => {
  const response1 = await agent.post(prefix('/user/login')).send({ name: 'root', password: 'admin1234' });

  const response2 = await agent.post(prefix('/user/login')).send({ name: 'root', password: 'admin123' });

  expect(response1.body.success).toEqual(false);
  expect(response2.body.success).toEqual(true);
});

test('GET /user: get success when logged in', async () => {
  const response = await agent.get(prefix('/user'));
  expect(response.body.data.id).toBeDefined();
});
