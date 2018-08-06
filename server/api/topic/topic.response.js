

module.exports = {
  'create-topic': {
    success: `<CreateTopicResponse xmlns="http://sns.amazonaws.com/doc/2010-03-31/">
      <CreateTopicResult>
        <TopicArn>arn:aws:sns:{{AWSRegion}}:{{AWSAccountId}}:{{TopicName}}</TopicArn>
      </CreateTopicResult>
      <ResponseMetadata>
        <RequestId>087449e6-0c25-58ac-b61a-1a3e91199e03</RequestId>
      </ResponseMetadata>
    </CreateTopicResponse>`,
  },
  subscribe: {
    success: `<SubscribeResponse xmlns="http://sns.amazonaws.com/doc/2010-03-31/">
      <SubscribeResult>
        <SubscriptionArn>pending confirmation</SubscriptionArn>
      </SubscribeResult>
      <ResponseMetadata>
        <RequestId>5506b3ba-0f65-5ca9-9cf9-e062ba2349be</RequestId>
      </ResponseMetadata>
    </SubscribeResponse>`,
    invalidEndpoint: `<ErrorResponse xmlns="http://sns.amazonaws.com/doc/2010-03-31/">
      <Error>
        <Type>Sender</Type>
        <Code>AuthorizationError</Code>
        <Message>Not authorized to subscribe internal endpoints</Message>
      </Error>
      <RequestId>6021cb2b-fdb5-5ab5-bd5a-98f3494319e1</RequestId>
    </ErrorResponse>`,
  },
  publish: {
    success: `<PublishResponse xmlns="http://sns.amazonaws.com/doc/2010-03-31/">
      <PublishResult>
        <MessageId>f70ff22a-a650-5178-8af7-a1f267a5c4e3</MessageId>
      </PublishResult>
      <ResponseMetadata>
        <RequestId>0b0d2d8e-0418-54c5-908a-7e56c5ed615e</RequestId>
      </ResponseMetadata>
    </PublishResponse>`,
  },
};
