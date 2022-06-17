import app from '../index';
import server from '../server';
import { client } from '../db';
import request from 'supertest';

afterAll(async () => {
  server.close();
  await client.close();
});

describe('Test for Users', () => {
  describe('Test for [GET] /api/v1/users', () => {
    test('should return a list of users', async () => {
      const response = await request(app).get('/api/v1/users');

      expect(response.status).toEqual(200);
    });
  });
});
