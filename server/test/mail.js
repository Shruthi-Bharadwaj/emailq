const nodemailer = require('nodemailer');

const options = {
  host: 'localhost',
  port: 3025,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },

};
const transporter = nodemailer.createTransport(options);
const email = {
  envelope: {
    to: ['shruthi.bharadwaj@quetzal.in'],
    from: 'notifications@quezx.com',
  },
  raw: {
    path: '/home/gloryque/emailq/server/components/bounce.eml',
  },
};
(function x() {
  return new Promise((resolve, reject) => {
    transporter.sendMail(email, (error, i) => {
      if (error) return reject(error);
      const info = i;
      info.messageId = info.messageId.slice(1, -1);
      return resolve(info);
    });
  });
}());

