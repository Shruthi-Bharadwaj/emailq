const nodemailer = require('nodemailer');
const config = require('../../config/environment');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const options = {
  host: config.PLATFORM_SMTP_HOST,
  port: config.PLATFORM_SMTP_PORT,
  secure: config.PLATFORM_SMTP_SECURE === 'true',
  ignoreTLS: config.PLATFORM_SMTP_IGNORETLS === 'true',
  auth: {
    user: config.PLATFORM_SMTP_AUTH_USER,
    pass: config.PLATFORM_SMTP_AUTH_PASS,
  },
};

if (Number(options.port) === 1025) delete options.auth;

const transporter = nodemailer.createTransport(options);

module.exports = transporter;
