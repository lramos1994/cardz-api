const request = require('supertest');
const app = require('../app');
const { database } = require('../database');
const { loginWithDefaultUser } = require('./common');

/**
 * Connect to a new in-memory database before running any tests.
 * Create test user
 */
beforeAll(async () => database.start());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await database.cleanup();
  await database.close();
});

describe('Deck Endpoints', () => {

  const deck = {
    name: 'Test Deck',
  };

  let token;

  beforeAll(async () => {
    const response = await loginWithDefaultUser();
    [token] = response.body.token;
  });

  it('should create a new deck', async () => {
    const res = await request(app)
      .post('/cards')
      .set('Authorization', `Bearer ${token}`)
      .send(deck);

    expect(res.statusCode).toEqual(201);
  });
});
