
const http = require('http');
const express = require('express');

const config = require('./config/environment');
const { User, EmailIdentity } = require('./conn/sqldb');


const { log } = console;
const app = express();

require('./config/express')(app);

const {
  host,
  port,
} = {
  host: '0.0.0.0',
  port: 1587,
};

process.on('unhandledRejection', (reason, p) => {
  log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
  log('uncaughtException', err);
});

const server = http.createServer(app);

if (config.env !== 'test') {
  server.listen(port, host, () => {
    User
      .count()
      .then((count) => {
        if (count) return null;

        return User
          .create({
            Username: config.AWSUser,
            Password: config.AWSPassword,
          })
          .then((user) => {
            log('user created', user.toJSON());
            return config.EMAIL_IDENTITY
              .split(',')
              .map(email => EmailIdentity
                .create({ Email: email, UserId: user.id }));
          });
      })
      .catch(err => log('error', err));

    log('\n######################################################');
    log('## EmailQ: Amazon SES Compatible                    ##');
    log('######################################################\n##');
    log(`## AmazonDomain: ${config.AmazonDomain}`);
    log(`## AWSDomain: ${config.AWSDomain}`);
    log(`## AWSUser: ${config.AWSUser}`);
    log(`## AWSPassword: ${config.AWSPassword}`);
    log(`## AWSAccountId: ${config.AWSAccountId}`);
    log(`## Current SES Dashboard: ${config.AWSRegion}.console.aws.${config.AmazonDomain}`);
    log(`## SES VerificationDomain: email-verification.${config.AWSRegion}.${config.AWSDomain}`);
    log(`## SESDomain: ${config.SESDomain}`);
    log(`## AWSRegion: ${config.AWSRegion}`);
    log(`## AWSRegionName: ${config.AWSRegionName}`);
    log(`## AWSAccessKeyId: ${config.AWSAccessKeyId}`);
    log(`## AWSSecretKey: ${config.AWSSecretKey}`);
    log(`## AWSSecretKey: ${config.AWSRegion}`);
    log(`## AWSEndPoint: ${config.AWSEndPoint || `http://${host}:${port}`}`);
    log(`## SMTP_HOST: ${config.SMTP_HOST || 'NA'}`);
    log(`## SMTP_PORT: ${config.SMTP_PORT || 'NA'}`);
    log(`## SMTP_SECURE: ${config.SMTP_SECURE || 'NA'}`);
    log(`## SMTP_IGNORETLS: ${config.SMTP_IGNORETLS || 'NA'}`);
    log(`## SMTP_AUTH_USER: ${config.SMTP_AUTH_USER || 'NA'}`);
    log(`## SMTP_AUTH_PASS: ${config.SMTP_AUTH_PASS || 'NA'}`);
    log(`## EMAIL_IDENTITY: ${config.EMAIL_IDENTITY || 'NA'}`);
    log(`## DOMAIN_IDENTITY: ${config.DOMAIN_IDENTITY || 'NA'}`);
    log(`## DAILY_LIMIT: ${config.DAILY_LIMIT || 50000}`);
    log(`## MAX_SEND_RATE: ${config.MAX_SEND_RATE || 14}`);
    log('## Update SMTP settings in `~/.emailq` and restart server');
    log('## To start demo email server `npm i -g maildev && maildev`');
    log('##\n#######################################################\n');
  });
}

module.exports = app;
