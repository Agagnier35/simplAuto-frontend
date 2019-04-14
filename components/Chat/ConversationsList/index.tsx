import React from 'react';
import SingleConversationSummary from '../SingleConversationSummary';
import { Card } from 'react-bootstrap';
import { ConversationsStyle, Container } from './style';
import { ConversationStatus } from '../../../generated/graphql';

const ConversationsList = (props: any) => {
  return (
    <Container currentOffer={props.selectedOffer}>
      {props.conversations.map((conversation: any) => (
        <ConversationsStyle>
          <Card
            key={conversation.id}
            hidden={conversation.status === ConversationStatus.Deleted}
            className={
              props.selectedOffer &&
              conversation.id === props.selectedOffer.conversation.id
                ? 'isSelected'
                : ''
            }
          >
            <SingleConversationSummary
              onClickCallback={props.onClickCallback}
              conversation={conversation}
            />
          </Card>
        </ConversationsStyle>
      ))}
    </Container>
  );
};

export default ConversationsList;
