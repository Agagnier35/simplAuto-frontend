// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React from 'react';
import { multiUpdater } from '../../../../lib/MultiLang';
import SingleConversationSummary from './SingleConversationSummary';

const ConversationsList = (props: any) => {
  return props.conversations.map((conversation: any) => {
    return (
      <SingleConversationSummary
        onClickCallback={props.onClickCallback}
        conversation={conversation}
      />
    );
  });
};

export default multiUpdater(ConversationsList);
