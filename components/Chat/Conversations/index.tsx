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

  handleSelectConversation = (offer: Offer | null) => {
    this.setState({ currentOffer: offer });
  };

  setSelectedAsFirstConversation = (data: any) => {
    if (
      window.innerWidth > 900 &&
      !this.state.currentOffer &&
      data.me.conversations &&
      data.me.conversations.length > 0
    ) {
      this.setState({ currentOffer: data.me.conversations[0].offer });
    }
  };

  render() {
    const {
      translations: { conversation },
    } = this.props;
    return (
      <Query
        query={GET_USER_CONVERSATIONS_QUERY}
        onCompleted={this.setSelectedAsFirstConversation}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          if (!data.me.conversations || data.me.conversations.length === 0) {
            return <p>{conversation.noConversations}</p>;
          }
          const currentConversation = data.me.conversations.find(
            (conversation: any) =>
              this.state.currentOffer &&
              conversation.offer.id === this.state.currentOffer.id,
          );

          let currentOffer = null;
          if (currentConversation) {
            currentOffer = currentConversation.offer;
          }
          return (
            <div style={{ display: 'flex' }}>
              <ConversationsList
                onClickCallback={this.handleSelectConversation}
                conversations={data.me.conversations}
                selectedOffer={currentOffer}
              />

              {currentOffer && data.me.conversations.length > 0 && (
                <ChatWindow
                  handleSelectConversation={(offer: any) =>
                    this.handleSelectConversation(offer)
                  }
                  offer={currentOffer}
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
