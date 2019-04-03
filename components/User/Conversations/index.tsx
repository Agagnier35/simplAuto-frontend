import React, { Component } from 'react';
import { multiUpdater } from '../../../lib/MultiLang';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import ConversationsList from './ConversationsList';
import { Row, Col } from 'react-bootstrap';
import { Offer } from '../../../generated/graphql';
import Chat from '../../Chat/Chat';

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
        {({ data, loading, error }) => {
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
                  <Chat
                    offer={
                      data.me.conversations.find(
                        (conversation: any) =>
                          conversation.offer.id === currentOffer.id,
                      ).offer
                    }
                    offerQuery={{ query: GET_USER_CONVERSATIONS_QUERY }}
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
