const { AWSEndPoint } = require('../../config/environment');

const regex = /(<a[^>]* href\s*=[\s"']*)(http[^"'>\s]+)/gi;

const awsClickEndpoint = AWSEndPoint; // r.us-west-2.awstrack.me  == `r.${AWSRegion}.awstrack.me`

exports.wrapLink = (html, messageId, whiteLabelUrl) => html
  .replace(regex, (match, prefix, url) => {
    const actualUrl = encodeURIComponent(url);
    const query = `url=${actualUrl}&messageId=${messageId}`;
    return `${prefix}${whiteLabelUrl || awsClickEndpoint}/api/emails/click?${query}`;
  });

exports.pxl = (messageId, whiteLabelUrl) => {
  const src = `${whiteLabelUrl || awsClickEndpoint}/api/emails/open.gif?messageId=${messageId}`;
  return `<img src='${src}' width='1' height='1' alt='ses'>`;
};

