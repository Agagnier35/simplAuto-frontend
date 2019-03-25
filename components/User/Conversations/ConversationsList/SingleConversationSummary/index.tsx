// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React, { Component } from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';

class SingleConversationSummary extends Component {
  state = {};

  render = () => {
    return <div>Single Conversation</div>;
  };
}

export default multiUpdater(SingleConversationSummary);
