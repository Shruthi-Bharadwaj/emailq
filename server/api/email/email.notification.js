
const platformEmailConnection = require('../../conn/nodeMailer/platform');
const { AWSAccountId, AWSRegionName } = require('../../config/environment');
const { signedUrl } = require('../../conn/nodeMailer/awsv4');

exports.verifyEmailIdentity = (to) => {
  // no-reply-aws@amazon.com
  const from = 'Amazon Web Services <notifications@quezx.com>';

  const payload = {
    Context: AWSAccountId,
    'Identity.IdentityName': to,
    'Identity.IdentityType': 'EmailAddress',
    Operation: 'ConfirmVerification',
    Namespace: 'Bacon',
  };

  const subject = `Amazon Web Services – Email Address Verification Request in region ${AWSRegionName}`;
  const text = `Dear Amazon Web Services Customer,

    We have received a request to authorize this email address for use with Amazon SES and Amazon Pinpoint in region US West (Oregon). If you requested this verification, please go to the following URL to confirm that you are authorized to use this email address:
    
    ${signedUrl(payload)}
    
    Your request will not be processed unless you confirm the address using this URL. This link expires 24 hours after your original verification request.
    
    If you did NOT request to verify this email address, do not click on the link. Please note that many times, the situation isn't a phishing attempt, but either a misunderstanding of how to use our service, or someone setting up email-sending capabilities on your behalf as part of a legitimate service, but without having fully communicated the procedure first. If you are still concerned, please forward this notification to aws-email-domain-verification@amazon.com and let us know in the forward that you did not request the verification.
    
    To learn more about sending email from Amazon Web Services, please refer to the Amazon SES Developer Guide at http://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html and Amazon Pinpoint Developer Guide at http://docs.aws.amazon.com/pinpoint/latest/userguide/welcome.html.
    
    Sincerely, 
    
    The Amazon Web Services Team.`;

  return platformEmailConnection
    .sendMail({
      from,
      to,
      subject,
      text,
    });
};
