
const request = require('supertest');

const app = require('../../app');
const auth = require('../../../logs/credentials');

describe('GET /api/emailIdentities', () => {
  it('return address', (done) => {
    request(app)
      .get('/api/emailIdentities')
      .set('Authorization', `Bearer ${auth.access_token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        done();
      });
  });
});