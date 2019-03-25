// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React, { Component } from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';

class SingleConversationSummary extends Component {
  state = {};

  render = () => {
    const { conversation }: any = this.props;
    return (
      <div>
        <div>Buyer</div>
        <div>Seller</div>
      </div>
    );
  };
}

export default multiUpdater(SingleConversationSummary);
