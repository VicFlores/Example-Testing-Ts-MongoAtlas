import app from '../index';
import server from '../server';
import { client } from '../db';
import request from 'supertest';

describe('Test for Users', () => {
  let api: request.SuperTest<request.Test>;

  beforeAll(async () => {
    api = request(app);
  });

  afterAll(async () => {
    server.close();
    await client.close();
  });

  describe('Test for [GET] /api/v1/users', () => {
    test('should return a list of users', async () => {
      const response = await api.get('/api/v1/users');

      expect(response.status).toEqual(200);
    });
  });
});
