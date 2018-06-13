const fs = require('fs');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

const AWSRegion = process.env.AWSRegion || 'us-west-2';
const AWSDomain = process.env.AWSDomain || os.hostname();
const IN_SMTP_AUTH_USER = process.env.IN_SMTP_AUTH_USER || `daemon@${AWSDomain}`;
const AWSSecretKey = process.env.AWSSecretKey || 'secret';

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

const root = path.normalize(`${__dirname}/../../..`);

if (!fs.existsSync(path.join(getUserHome(), '.emailq'))) {
  fs.writeFileSync(path.join(getUserHome(), '.emailq'), 'SMTP_PORT=1025');
}
const crypto = require('crypto');

const sesSTMPPass = (secret) => {
  const message = 'SendRawEmail';
  const versionInBytes = String.fromCharCode(67);

  const signatureInBytes = crypto.createHmac('sha256', secret).update(message).digest('hex');
  const signatureAndVer = `${versionInBytes}.${signatureInBytes}`;
  const smtpPassword = Buffer.from(signatureAndVer).toString('base64');

  return smtpPassword;
};

const env = dotenv.config({ path: path.join(getUserHome(), '.emailq') });
process.env.NODE_ENV = process.env.NODE_ENV || env.NODE_ENV || 'development';
const config = {
  all: {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    ip: process.env.IP || '0.0.0.0',
    root,
    AWSAccountId: process.env.AWSAccountId || 831107063919,
    AWSRegionName: process.env.AWSRegionName || 'US West (Oregon)',
    AWSRegion,
    AWSEndPoint: process.env.AWSEndPoint || 'http://127.0.0.1:1587',
    AWSSecretKey,
    AWSAccessKeyId: process.env.AWSAccessKeyId,
    AWSVerificationDomain: 'email-verification',
    BOUNCE_EMAILS_SMPT_PORT: process.env.BOUNCE_EMAILS_SMPT_PORT || 3025,
    AccountId: 706391958311,
    IN_SMTP_AUTH_USER,
    IN_SMTP_AUTH_PASS: sesSTMPPass(AWSSecretKey),
    JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  },
  development: {},

  staging: {},

  production: {},
};

const conf = Object.assign({}, env.parsed, config.all, config[process.env.NODE_ENV || 'development']);

module.exports = conf;
