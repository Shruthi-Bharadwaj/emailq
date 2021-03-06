
/**
 * Main application routes
 */

const { name, version } = require('../package.json');

const { IDENTITY } = require('./config/environment');
const TemplateCtrl = require('./api/template/template.controller');
const EmailCtrl = require('./api/email/email.controller');

const template = require('./api/template');
const logger = require('./components/logger');

module.exports = function (app) {
  app.use('/', (req, res, next) => {
    if (req.method !== 'POST') return next();
    console.log('request', req.body.Action)
    switch (req.body.Action) {
      case 'CreateTemplate': return TemplateCtrl.create(req, res, next);
      case 'SendEmail': return EmailCtrl.create(req, res, next);
      case 'SendBulkTemplatedEmail': return EmailCtrl.SendBulkTemplatedEmail(req, res, next);
      case 'SendTemplatedEmail': return EmailCtrl.SendTemplatedEmail(req, res, next);
      case 'UpdateTemplate': return TemplateCtrl.update(req, res, next);
      default: return next();
    }
  });
  app.use('/templates', template)
  app.get('/emails', (req, res) => res.json(IDENTITY.split(',')));
  app.get('/', (req, res) => res.json({ name, version }));
  app.use(logger.transports.sentry.raven.errorHandler());
  // All undefined asset or api routes should return a 404
  app.use((e, req, res, next) => {
    const err = e;
    const { body, headers, user } = req;

    logger.error(err.message, err, {
      url: req.originalUrl,
      body,
      headers,
      user,
    });

    return res.status(500).json({ message: err.message, stack: err.stack });
  });


  app.route('/*').get((req, res) => res.status(404).json({ message: '404' }));
};
