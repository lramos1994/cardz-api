const request = require('supertest');
const app = require('../app');
const { database } = require('../database');
const { loginWithDefaultUser } = require('./common');

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

  it('should retrieve de user token', async () => {
    return loginWithDefaultUser().then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  it('should not get the user token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'lramos@gmail.com.br',
        password: 'lucas1234',
      });

    expect(res.statusCode).toEqual(404);
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
