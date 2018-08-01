const {
  AWSAccessKeyId, AWSSecretKey, AWSRegion, AWSVerificationDomain, AWSDomain,
} = require('../../config/environment');

process.env.AWS_ACCESS_KEY_ID = AWSAccessKeyId;
process.env.AWS_SECRET_ACCESS_KEY = AWSSecretKey;
process.env.AWS_REGION = AWSRegion;

const v4 = require('aws-signature-v4');
const url = require('url');
const querystring = require('querystring');
const moment = require('moment');

exports.signedUrl = (headers) => {
  const host = `${AWSVerificationDomain}.${AWSRegion}.${AWSDomain}`;
  const signedUrl = v4
    .createPresignedURL('GET', host, '/', 'ses', {}, {
      headers,
    });

  return signedUrl;
};

exports.verifyUrl = (surl) => {
  const urlObject = url.parse(surl);
  const qs = querystring.parse(urlObject.query);

  const signedHeadersMap = qs['X-Amz-SignedHeaders']
    .split(';')
    .reduce((nxt, x) => Object
      .assign(nxt, { [x]: true }), {});

  const timestamp = moment
    .utc(qs['X-Amz-Date'], 'YYYYMMDDTHHmmssZ')
    .utcOffset('+05:30')
    .toDate();

  const headers = Object
    .keys(qs)
    .reduce((nxt, key) => {
      if (signedHeadersMap[key.toLowerCase()]) Object.assign(nxt, { [key]: qs[key] });
      return nxt;
    }, {});

  const verificationURL = v4
    .createPresignedURL('GET', urlObject.host, urlObject.pathname, 'ses', {}, {
      timestamp,
      headers,
    });

  const recheck = querystring.parse(url.parse(verificationURL).query)['X-Amz-Signature'];
  return recheck === qs['X-Amz-Signature'];
};

