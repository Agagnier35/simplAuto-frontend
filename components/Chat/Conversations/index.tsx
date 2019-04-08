import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import ConversationsList from '../ConversationsList';
import { Conversation } from '../../../generated/graphql';
import ChatSection from '../ChatSection';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';

export interface ConversationProps {
  translations: Translations;
}

interface ConversationsState {
  currentConvo: Conversation | null;
}

class Conversations extends Component<ConversationProps, ConversationsState> {
  state = {
    currentConvo: null,
  };

  handleSelectConversation = (convo: Conversation) => {
    this.setState({ currentConvo: convo });
  };

  render() {
    const { currentConvo } = this.state;
    const {
      translations: { conversation },
    } = this.props;
    return (
      <Query query={GET_USER_CONVERSATIONS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          if (!data.me.conversations) return null;
          return (
            <div style={{ display: 'flex' }}>
              <p hidden={data.me.conversations !== undefined}>
                {conversation.noConversations}
              </p>

              <ConversationsList
                onClickCallback={this.handleSelectConversation}
                conversations={data.me.conversations}
                selectedConvo={
                  currentConvo ? currentConvo : data.me.conversations[0]
                }
              />

              {data.me.conversations && (
                <ChatSection
                  convo={currentConvo ? currentConvo : data.me.conversations[0]}
                />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default multi(Conversations);
