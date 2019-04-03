// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React from 'react';
import { multiUpdater } from '../../../../../../lib/MultiLang';
import { Col, Row, Image } from 'react-bootstrap';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../../../../General/Header';

const isMyOffer = (offer: any, meQuery: any) => {
  return offer.creator && meQuery.data.me.id === offer.creator.id;
};

const SingleConversationSummary = (props: any) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  if (loggedQuery.loading) return null;
  const conversationDetails = props.conversationDetails;
  return (
    <Col xs md={10}>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <Row>
                {isMyOffer(conversationDetails.conversation.offer, loggedQuery)
                  ? conversationDetails.conversation.buyer.lastName
                  : conversationDetails.conversation.seller.lastName}
                ,
                {isMyOffer(conversationDetails.conversation.offer, loggedQuery)
                  ? conversationDetails.conversation.buyer.firstName
                  : conversationDetails.conversation.seller.firstName}
              </Row>
              <Row>
                {` ${conversationDetails.conversation.offer.car.manufacturer.name.toUpperCase()} ${conversationDetails.conversation.offer.car.model.name.toUpperCase()} ${
                  conversationDetails.conversation.offer.car.year
                }`}
              </Row>
              <Row>
                <div>{conversationDetails.conversation.offer.price}$</div>
              </Row>
              <Row>
                {conversationDetails.conversation.messages[
                  conversationDetails.conversation.messages.length - 1
                ].text !== ''
                  ? conversationDetails.conversation.messages[
                      conversationDetails.conversation.messages.length - 1
                    ].text
                  : `Image sent.`}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default multiUpdater(SingleConversationSummary);
