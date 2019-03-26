import React, { Component } from 'react';
import { multiUpdater } from '../../../lib/MultiLang';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import ConversationsList from './ConversationsList';
import Conversation from './Conversation';
import { Row, Col } from 'react-bootstrap';

class Conversations extends Component {
  state = {
    currentOffer: null,
  };
  onClickCallback = (offer: any) => {
    console.log('IN THE CONVERSATIONS.');
    console.log(offer);
    this.state.currentOffer = offer;
  };

  render = () => {
    return (
      <Query query={GET_USER_CONVERSATIONS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          return (
            <Row>
              <Col>
                <ConversationsList
                  onClickCallback={this.onClickCallback}
                  conversations={data.me.conversations}
                />
              </Col>
              <Col>
                {this.state.currentOffer ? (
                  <Conversation offer={this.state.currentOffer} />
                ) : null}
              </Col>
            </Row>
          );
        }}
      </Query>
    );
  };
}

export default multiUpdater(Conversations);
