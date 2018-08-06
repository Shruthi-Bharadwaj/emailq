
const hookshot = require('../../conn/hookshot');
const responses = require('./topic.response');

const {
  AWSRegion, AWSAccountId,
} = require('../../config/environment');

exports.create = (req, res) =>
  res
    .end(responses['create-topic']
      .success
      .replace('{{AWSRegion}}', AWSRegion)
      .replace('{{TopicName}}', req.body.Name)
      .replace('{{AWSAccountId}}', AWSAccountId))
;

exports.subscribe = (req, res, next) => {
  switch (req.body.Protocol) {
    case 'http': {
      hookshot.add(req.body.TopicArn, req.body.Endpoint)
        .then(() => res.end(responses.subscribe.success))
        .catch(next);
      break;
    }
    default: next();
  }
};

exports.publish = (req, res) => {
  const headers = {};
  hookshot
    .trigger(req.body.TopicArn, req.body.Message, headers);
  return res.end(responses.publish.success);
};
