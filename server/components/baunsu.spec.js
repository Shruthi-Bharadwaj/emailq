const fs = require('fs');
const { expect } = require('chai');
const baunsu = require('./baunsu');
const { root } = require('../config/environment/index.js');

describe('convert an inbound bounced email to JSON', () => {
  it('should give a JSON describing the details of bounced email', (done) => {
    const bounceDetails = baunsu(fs.readFileSync(`${root}/server/components/bounce.eml`));
    expect(bounceDetails).to.have.property('notificationType', 'Bounce');
    expect(bounceDetails).to.have.property('bounce');
    done();
  });
});

