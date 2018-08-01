const expressJwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const {
  JWT_SECRET,
} = require('../../config/environment');

exports.authenticate = expressJwt({
  secret: JWT_SECRET,
  getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.access_token) {
      return req.query.access_token;
    }

    return null;
  },
});

exports.sign = user => jsonwebtoken.sign(user, JWT_SECRET);

