// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React, { Component } from 'react';
import { multiUpdater } from '../../../../lib/MultiLang';
import SingleConversationSummary from './SingleConversationSummary';

class ConversationsList extends Component {
  state = {};

  render = () => {
    console.log(this.props);
    const { conversations }: any = this.props;
    return conversations.map((conversation: any) => {
      return (
        <SingleConversationSummary
          onClickCallback={this.props.onClickCallback}
          conversation={conversation}
        />
      );
    });
  };
}

export default multiUpdater(ConversationsList);
