const request = require('supertest');
const app = require('../app');
const { database } = require('../database');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await database.start());

/**
 * Clear all test data after every test.
 */
// afterEach(async () => await database.cleanup());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await database.cleanup();
  await database.close();
});


describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        email: 'lramos@gmail.com.br',
        password: 'lucas123',
      });

    expect(res.statusCode).toEqual(200);
  });

  it('should not create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        email: 'lramos@gmail.com.br',
        password: 'lucas123',
      });

    expect(res.statusCode).toEqual(500);
  });
});
