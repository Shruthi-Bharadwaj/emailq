const WebHooks = require('node-webhooks');
const { root } = require('../config/environment');

const { log } = console;

const hookshot = new WebHooks({
  db: `${root}/subscriptions.json`,
  DEBUG: true,
});

const emitter = hookshot.getEmitter();

emitter.on('*.*', (shortname, statusCode, body) => {
  log('Success on trigger webHook', shortname, 'with status code', statusCode, 'and body', body);
});

module.exports = hookshot;
