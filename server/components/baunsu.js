const Baunsu = require('baunsu');

const baunsufn = (email) => {
  const baunsu = new Baunsu();
  return baunsu.detectSync(email);
};

// const messageIdRegex = new RegExp(/Message-ID.*/gm);

module.exports = (email) => {
  const baunsuResult = baunsufn(email);

  let bounceType = null;
  let bounceSubType = null;
  switch (baunsuResult.bounced) {
    case false: {
      bounceType = 'Undetermined';
      bounceSubType = 'Undetermined';
      break;
    }
    case true: {
      switch (true) {
        case !baunsuResult.status.code : {
          // console.log('ishard', baunsuResult.isHard());
          bounceType = 'Permanent';
          bounceSubType = 'General';
          break;
        }
        case (baunsuResult.status.detail.message === 'Mailbox full'): {
          bounceType = 'Transient';
          bounceSubType = 'MailboxFull';
          break;
        }
        // 5.1.1 'Bad destination mailbox address'
        // 5.0.0
        case (baunsuResult.status.class.message === 'Permanent Failure'): {
          bounceType = 'Permanent';
          bounceSubType = 'NoEmail';
          break;
        }
        default:
      }

      break;
    }
    default: throw new Error('rule not found');
  }

  const bounce = {
    bounceType,
    bounceSubType,
    reportingMTA: baunsuResult.reportingMta,
    bouncedRecipients: [{
      action: baunsuResult.action,
      emailAddress: baunsuResult.finalRecipient,
      status: (baunsuResult.status && baunsuResult.status.code)
        ? baunsuResult.status.code
        : baunsuResult.diagnosticCodes[1],
      diagnosticCode: baunsuResult.diagnosticCodes,
      timestamp: (new Date()).toISOString(),
      feedbackId: '0000014f20eb07dc-58484953-f5d7-4809-800f-ccdfd7041fe4-000000',
    }],
  };

  // console.log({bounce});
  // MessageId: messageIdRegex.exec(email)[0].split(':')[1].trim().slice(1, -1),

  return {
    notificationType: 'Bounce',
    bounce,
  };
};
