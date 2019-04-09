import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import ConversationsList from '../ConversationsList';
import { Offer } from '../../../generated/graphql';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import ChatWindow from '../ChatWindow';

export interface ConversationProps {
  translations: Translations;
}

interface ConversationsState {
  currentOffer: Offer | null;
}

class Conversations extends Component<ConversationProps, ConversationsState> {
  state = {
    currentOffer: null,
  };

  handleSelectConversation = (offer: Offer) => {
    this.setState({ currentOffer: offer });
  };

  render() {
    const { currentOffer } = this.state;
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
                selectedOffer={
                  currentOffer ? currentOffer : data.me.conversations[0].offer
                }
              />

              {data.me.conversations && (
                <ChatWindow
                  offer={
                    currentOffer ? currentOffer : data.me.conversations[0].offer
                  }
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
