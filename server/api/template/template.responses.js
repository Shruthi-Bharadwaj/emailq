
function generateNextTokenXML(limit, offset, totalCount) {
  return (totalCount > (limit + offset)) ? `<NextToken>${limit + offset}</NextToken>` : '';
}

function generateListTemplateXMLResponse(allTemplatesData, limit, offset, totalCount) {
  return `<ListTemplatesResponse xmlns="http://ses.amazonaws.com/doc/2010-12-01/">
        <ListTemplatesResult>
          <TemplatesMetadata>
              ${allTemplatesData.join('')}
          </TemplatesMetadata>
          ${generateNextTokenXML(limit, offset, totalCount)}
        </ListTemplatesResult>
        <ResponseMetadata>
          <RequestId>0aec8f44-6495-11e8-9b27-57db6fa2246c</RequestId>
        </ResponseMetadata>
      </ListTemplatesResponse>`;
}

module.exports = {
  templatesXML: `
      <member>
        <Name>{{templateName}}</Name>
        <CreatedTimestamp>{{templateCreatedOn}}</CreatedTimestamp>
      </member>
    `,
  listTemplatesXMLResponse: generateListTemplateXMLResponse,
};
