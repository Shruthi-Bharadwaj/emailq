const fs = require('fs');
const request = require('supertest');
const app = require('../../app');

const { root } = require('../../config/environment');

describe('GET /auth/token', () => {
  it('return token', (done) => {
    request(app)
      .post('/auth/token')
      .send({
        username: 'manjeshpv@gmail.com',
        password: 'admin',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        fs.writeFileSync(`${root}/logs/credentials.json`, JSON.stringify(res.body));
        done();
      });
  });
});
