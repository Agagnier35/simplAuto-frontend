import React from 'react';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import Conversations from '../components/chat/Conversations';

class ConversationsPage extends PrivateComponent {
  render() {
    return <Conversations />;
  }
}

export default ConversationsPage;
