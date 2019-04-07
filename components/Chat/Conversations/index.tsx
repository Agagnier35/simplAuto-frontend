import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import ConversationsList from '../ConversationsList';
import { Row, Col } from 'react-bootstrap';
import { Conversation } from '../../../generated/graphql';
import ChatSection from '../ChatSection';

interface ConversationsState {
  currentConvo: Conversation | null;
}

class Conversations extends Component<{}, ConversationsState> {
  state = {
    currentConvo: null,
  };

  handleSelectConversation = (convo: Conversation) => {
    this.setState({ currentConvo: convo });
  };

  render() {
    const { currentConvo } = this.state;
    return (
      <Query query={GET_USER_CONVERSATIONS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          if (!data.me.conversations) return null;
          return (
            <Row>
              <Col>
                <ConversationsList
                  onClickCallback={this.handleSelectConversation}
                  conversations={data.me.conversations}
                />
              </Col>
              <Col>
                {
                  <ChatSection
                    convo={
                      currentConvo ? currentConvo : data.me.conversations[0]
                    }
                  />
                }
              </Col>
            </Row>
          );
        }}
      </Query>
    );
  }
}

export default Conversations;
