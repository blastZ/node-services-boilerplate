import request from 'supertest';
import mongoose from 'mongoose';
import nico from '@blastz/nico';
import Mongo from '@blastz/nico/lib/utils/mongo';

import config from '../config';

let agent: request.SuperTest<request.Test>;

beforeAll(async () => {
  await nico.init(config);
  await Mongo.connect(mongoose, config.datastores.default.url);
  await mongoose.connection.db.dropDatabase();
  agent = request.agent(nico.app.callback());
});

afterAll(async () => {
  await Mongo.disconnect(mongoose);
});

test('GET /user: need login', async () => {
  const response = await agent.get('/user');
  expect(response.status).toEqual(401);
});

test('POST /user: correct params', async () => {
  const needName = await agent.post('/user').send({});
  const nameLength = await agent.post('/user').send({ name: 'roo' });
  const needPassword = await agent.post('/user').send({ name: 'root' });
  const passwordLength = await agent.post('/user').send({ name: 'root', password: '123' });

  expect(needName.body.success).toEqual(false);
  expect(nameLength.body.success).toEqual(false);
  expect(needPassword.body.success).toEqual(false);
  expect(passwordLength.body.success).toEqual(false);
});

test('POST /user: create user success', async () => {
  const response = await agent.post('/user').send({ name: 'root', password: 'admin123' });

  expect(response.body.success).toEqual(true);
});

test('POST /user: name is unique', async () => {
  const response = await agent.post('/user').send({ name: 'root', password: 'admin123' });

  expect(response.body.success).toEqual(false);
});

test('POST /user/login: login success', async () => {
  const response1 = await agent.post('/user/login').send({ name: 'root', password: 'admin1234' });

  const response2 = await agent.post('/user/login').send({ name: 'root', password: 'admin123' });

  expect(response1.body.success).toEqual(false);
  expect(response2.body.success).toEqual(true);
});

test('GET /user: get success when logged in', async () => {
  const response = await agent.get('/user');
  expect(response.body.data.id).toBeDefined();
});
