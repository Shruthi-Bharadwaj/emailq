const hbs = require('handlebars')
const SubjectPart = '{{#if isClosedJD }} Close JD request for {{role}}, {{clientName}} {{else}} Change in priority of {{role}}, {{clientName}}{{/if}}'
const data = { firstName: 'firstName',
  jobStatus: 'jobStatus',
  prefix: 'prefix',
  domain: 'domain',
  jobId: 'jobId',
  role: 'role',
  location: 'location',
  client_id: 'client_id',
  clientName: 'ClientName',
  userName: 'userName',
  isClosedJD: false,
  ad: '<img width=\'450\' src=\'https://cdn.quezx.com/img/appamailerfooterbanner.png\' alt=\'appamailerfooterbanner\'/>' }
console.log(hbs.compile(SubjectPart)(data));
