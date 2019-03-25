import React from 'react';
import Translations from '../lib/MultiLang/locales/types';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import Conversations from '../components/User/Conversations';

class ConversationsPage extends PrivateComponent {
  render() {
    return <Conversations />;
  }
}

export default ConversationsPage;
