const path = require('path');
const bodyParser = require('body-parser');
const config = require('./environment')

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.set('appPath', path.join(config.root, 'client'));
    app.use((req, res, next) => {
      const errorXML = `<ErrorResponse xmlns="http://ses.amazonaws.com/doc/2010-12-01/">
        <Error>
          <Type>Sender</Type>
          <Code>InvalidClientTokenId</Code>
          <Message>The security token included in the request is invalid.</Message>
        </Error>
        <RequestId>7b9bdbc5-4df8-11e8-98b1-73c756e0089d</RequestId>
      </ErrorResponse>`;

      if(req.headers.authorization && config.AWSAccessKeyId === req.headers.authorization.split('=')[1].split('/')[0]) return next();
     return next()
      return res.status(403).end(errorXML);
    });

    require('../routes')(app);
}
