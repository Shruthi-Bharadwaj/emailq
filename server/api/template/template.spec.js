/* eslint-disable no-unused-expressions */
const sesEmail = require('./data/CreateTemplate.cmd');
const { expect } = require('chai');
const { Template } = require('../../conn/sqldb');
const ses = require('../../conn/ses/config');
const sampleListTemplatesParameters = require('./data/listTemplates.cmd');
const unflatten = require('../../components/utils/unflatten');

async function destroyTemplate() {
  return Template.destroy({ where: { TemplateName: 'MyTemplate' } });
}

async function destroyAllTemplates() {
  return Template.destroy({ truncate: true });
}

async function createTemplate(template) {
  return Template.create(template);
}

function getTemplate() {
  return unflatten(sesEmail).Template;
}

describe('POST CreateTemplate', () => {
  it('Create an email Template', (done) => {
    destroyTemplate().then(() => {
      ses.createTemplate(sesEmail, (err, res) => {
        expect(res).to.have.property('ResponseMetadata');
        expect(res.ResponseMetadata).to.have.property('RequestId', 'b5084fa4-46d1-11e8-baf2-a7504da2e8d8');
        done();
      });
    });
  });

  it('should throw error if template already exists', (done) => {
    ses.createTemplate(sesEmail, (err) => {
      expect(err).to.have.property('code', 'AlreadyExists');
      done();
    });
  });
});

describe('UPDATE Template', () => {
  it('should update an email template for a existing template', (done) => {
    ses.updateTemplate(sesEmail, (err, res) => {
      expect(res).to.have.property('ResponseMetadata');
      expect(res.ResponseMetadata).to.have.property('RequestId', '16012633-488e-11e8-a36e-d56e0ae5dc5d');
      done();
    });
  });

  it('should throw error if template does not exists', (done) => {
    destroyAllTemplates().then(() => {
      ses.updateTemplate(sesEmail, (err) => {
        expect(err).to.have.property('code', 'TemplateDoesNotExist');
        done();
      });
    });
  });
});

describe('LIST available Templates', () => {
  let copyOfsampleListTemplatesParameters = sampleListTemplatesParameters;
  beforeEach(async () => {
    await destroyAllTemplates();
    const template = getTemplate();
    template.TemplateName = 'testTemplate1';
    await createTemplate(template);
    template.TemplateName = 'testTemplate2';
    await createTemplate(template);
  });
  afterEach(() => {
    copyOfsampleListTemplatesParameters = sampleListTemplatesParameters;
  });

  it('should give all available templates when no parameters are passed', (done) => {
    copyOfsampleListTemplatesParameters = {};
    ses.listTemplates(copyOfsampleListTemplatesParameters, (err, res) => {
      expect(res).to.have.property('TemplatesMetadata');
      expect(res.TemplatesMetadata).to.be.an('array');
      expect(res.TemplatesMetadata).to.have.lengthOf(2);
      expect(res.NextToken).to.be.undefined;
      done();
    });
  });

  it('should return all the templates after the NextToken', (done) => {
    ses.listTemplates(copyOfsampleListTemplatesParameters, (err, res) => {
      expect(res).to.have.property('TemplatesMetadata');
      expect(res.TemplatesMetadata).to.be.an('array');
      expect(res.TemplatesMetadata).to.have.lengthOf(1);
      expect(res.NextToken).to.be.undefined;
      done();
    });
  });

  it('should return nextToken when there are additional email templates available to be listed', (done) => {
    copyOfsampleListTemplatesParameters.MaxItems = 1;
    delete copyOfsampleListTemplatesParameters.NextToken;
    ses.listTemplates(copyOfsampleListTemplatesParameters, (err, res) => {
      expect(res).to.have.property('TemplatesMetadata');
      expect(res.TemplatesMetadata).to.be.an('array');
      expect(res.TemplatesMetadata).to.have.lengthOf(1);
      expect(res.NextToken).to.not.be.undefined;
      done();
    });
  });

  it('should return no templates when there are no templates created', (done) => {
    destroyAllTemplates().then(() => {
      ses.listTemplates(copyOfsampleListTemplatesParameters, (err, res) => {
        expect(res).to.have.property('TemplatesMetadata');
        expect(res.TemplatesMetadata).to.be.an('array');
        expect(res.TemplatesMetadata).to.have.lengthOf(0);
        expect(res.NextToken).to.be.undefined;
        done();
      });
    });
  });
});
