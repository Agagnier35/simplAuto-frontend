import React from 'react';
import SingleConversationSummary from '../SingleConversationSummary';
import { Card } from 'react-bootstrap';

const ConversationsList = (props: any) => {
  return props.conversations.map((conversation: any) => {
    return (
      <Card key={conversation.id}>
        <SingleConversationSummary
          onClickCallback={props.onClickCallback}
          conversation={conversation}
        />
      </Card>
    );
  });
};

export default ConversationsList;
