const request = require('supertest');
const app = require('../app');

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        email: 'laosssssss@hotrmail.com.br',
        password: 'lucas123',
      });

    expect(res.statusCode).toEqual(200);
  });
});
