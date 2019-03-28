import React, { Component } from 'react';
import { multiUpdater } from '../../../lib/MultiLang';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import ConversationsList from './ConversationsList';
import Conversation from './Conversation';
import { Row, Col } from 'react-bootstrap';
import { Offer, ConversationType } from '../../../generated/graphql';
import Chat from '../../Chat/Chat';
import { MESSAGE_SUBSCRIPTION } from '../../Chat/Chat/Subscriptions';

interface ConversationsState {
  currentOffer: Offer | null;
}

class Conversations extends Component<{}, ConversationsState> {
  state = {
    currentOffer: null,
  };

  handleSelectConversation = (offer: Offer) => {
    this.setState({ currentOffer: offer });
  };

  render() {
    const { currentOffer } = this.state;
    return (
      <Query query={GET_USER_CONVERSATIONS_QUERY}>
        {({ data, loading, error, subscribeToMore }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          return (
            <Row>
              <Col>
                <ConversationsList
                  onClickCallback={this.handleSelectConversation}
                  conversations={data.me.conversations}
                />
              </Col>
              <Col>
                {currentOffer && (
                  <Conversation
                    offer={
                      data.me.conversations.find(
                        (conversation: any) =>
                          conversation.offer.id === currentOffer.id,
                      ).offer
                    }
                    loading={loading}
                    offerQuery={{ query: GET_USER_CONVERSATIONS_QUERY }}
                    subscribeToNewComments={() =>
                      subscribeToMore({
                        document: MESSAGE_SUBSCRIPTION,
                        variables: {
                          conversationID: currentOffer.conversation.id,
                        },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;

                          const message =
                            subscriptionData.data.messageSubscription;

                          return {
                            ...prev,
                            me: {
                              ...prev.me,
                              conversations: prev.me.conversations.map(
                                (conversation: ConversationType) => {
                                  let finalConversation = conversation;
                                  if (
                                    conversation.offer.id === currentOffer.id
                                  ) {
                                    finalConversation = {
                                      ...conversation,
                                      messages: [
                                        ...conversation.messages,
                                        message,
                                      ],
                                    };
                                    console.log(
                                      finalConversation,
                                      'finalConversation',
                                    );
                                  }
                                  return finalConversation;
                                },
                              ),
                            },
                          };
                        },
                      })
                    }
                  />
                )}
              </Col>
            </Row>
          );
        }}
      </Query>
    );
  }
}

export default multiUpdater(Conversations);
