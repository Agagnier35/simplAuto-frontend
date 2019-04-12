import React from 'react';
import SingleConversationSummary from '../SingleConversationSummary';
import { Card } from 'react-bootstrap';
import { ConversationsStyle } from './style';
import { ConversationStatus } from '../../../generated/graphql';

const ConversationsList = (props: any) => {
  return (
    <div>
      {props.conversations.map((conversation: any) => (
        <ConversationsStyle>
          <Card
            key={conversation.id}
            hidden={conversation.status === ConversationStatus.Deleted}
            className={
              conversation.id === props.selectedConvo.id ? 'isSelected' : ''
            }
          >
            <SingleConversationSummary
              onClickCallback={props.onClickCallback}
              conversation={conversation}
            />
          </Card>
        </ConversationsStyle>
      ))}
    </div>
  );
};

export default ConversationsList;
