const { EmailIdentity } = require('../../conn/sqldb');

exports.index = (req, res, next) => EmailIdentity
  .findAll()
  .then(emailIdentities => res.json(emailIdentities))
  .catch(next);
