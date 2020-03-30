import request from 'supertest';
import init from '..';

const prefix = (route: string) => '/api/v1' + route;

test('GET /user', async () => {
  const app = await init();
  const server = app.callback();
  const response = await request(server).get(prefix('/user'));
  expect(response.status).toBe(401);
  console.log(response.body);
});
