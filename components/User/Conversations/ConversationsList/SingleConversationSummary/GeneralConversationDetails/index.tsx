// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React from 'react';
import { multiUpdater } from '../../../../../../lib/MultiLang';
import { Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../../../../General/Header';

const isMyOffer = (offer: any, meQuery: any) => {
  return offer.creator && meQuery.data.me.id === offer.creator.id;
};

const isMyMessage = (message: any, meQuery: any) => {
  return message.sender.id === meQuery.data.me.id;
};

const SingleConversationSummary = (props: any) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  if (loggedQuery.loading) return null;
  const conversationDetails = props.conversationDetails;
  console.log(
    conversationDetails.conversation.messages[
      conversationDetails.conversation.messages.length - 1
    ],
  );
  return (
    <Col xs md={15}>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Row>
                {/* {isMyOffer(conversationDetails.conversation.offer, loggedQuery)
                  ? `${conversationDetails.conversation.buyer.lastName}, ${
                      conversationDetails.conversation.buyer.firstName
                    }`
                  : `${conversationDetails.conversation.seller.lastName}, ${
                      conversationDetails.conversation.seller.firstName
                    }`} */}
              </Row>
              <Row>
                <div>{conversationDetails.conversation.offer.price}$</div>
              </Row>
              <Row>
                {isMyMessage(
                  conversationDetails.conversation.messages[
                    conversationDetails.conversation.messages.length - 1
                  ],
                  loggedQuery,
                ) ? (
                  <b>You : </b>
                ) : (
                  <b>
                    {
                      conversationDetails.conversation.messages[
                        conversationDetails.conversation.messages.length - 1
                      ].sender.lastName
                    }
                    ,{' '}
                    {
                      conversationDetails.conversation.messages[
                        conversationDetails.conversation.messages.length - 1
                      ].sender.firstName
                    }{' '}
                    :
                  </b>
                )}
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
