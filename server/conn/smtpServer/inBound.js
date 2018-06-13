const SMTPServer = require('smtp-server').SMTPServer;
const { nodeMailerSendRawEmail } = require('../../conn/nodeMailer');
const baunsu = require('../../components/baunsu');
const rp = require('request-promise');

const sns = {
  publish(body) {
    rp({
      method: 'POST',
      url: 'http://localhost:3000/api/test-bounce',
      body,
      json: true,
    });
  },
};

function sendBouncedMailDetails(eml) {
  return nodeMailerSendRawEmail({
    envelope: {
      to: ['shruthi.bharadwaj@quetzal.in'],
      from: 'notifications@quezx.com',
    },
    raw: eml,
  });
}

function decodeIncomingBounceEmails(stream, session, callback) {
  // stream.pipe(process.stdout); // print message to console
  let email = '';
  stream.on('data', (mail) => {
    email += mail;
  });
  stream.on('end', () => {
    const decodedEmail = baunsu(email);
    sendBouncedMailDetails(email);
    sns.publish(decodedEmail);
    return callback();
  });
}

const options = {
  secure: false,
  authOptional: true,
  onData: decodeIncomingBounceEmails,
};
const server = new SMTPServer(options);

module.exports = server;
