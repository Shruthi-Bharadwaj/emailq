
const { wrapLink, pxl } = require('./tracking');

const assert = require('assert');

describe('Links in email replacing', () => {
  it('should return -1 when the value is not present', (done) => {
    const html = '<a style="color:red;" href="https://google.com" style="color:red;">hello</a>';
    const messageId = '010101646a488ef9-9de46e70-9010-11e8-9dc6-f9b64572bee5-000000@us-west-2.amazonses.com';
    const manipulated = wrapLink(html, messageId);
    const url = `http://localhost:1587/api/emails/click?url=https%3A%2F%2Fgoogle.com&messageId=${messageId}`;
    const expected = `<a style="color:red;" href="${url}" style="color:red;">hello</a>`;
    assert(manipulated === expected, 'should be true');
    done();
  });
});

describe('Pixel Image for tracking email open', () => {
  it('should return -1 when the value is not present', (done) => {
    const messageId = '010101646a488ef9-9de46e70-9010-11e8-9dc6-f9b64572bee5-000000@us-west-2.amazonses.com';
    const manipulated = pxl(messageId);
    const url = `http://localhost:1587/api/emails/open.gif?messageId=${messageId}`;
    const expected = `<img src='${url}' width='1' height='1' alt='ses'>`;
    assert(manipulated === expected, 'should be true');
    done();
  });
});

