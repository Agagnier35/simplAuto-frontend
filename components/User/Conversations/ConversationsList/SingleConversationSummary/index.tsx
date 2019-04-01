// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';
import { Col, Row, Image } from 'react-bootstrap';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../../../General/Header';

// Il faut pouvoir déterminer qui est la personne qui a send le message.
export interface SingleConversationSummaryProps {
  conversation: any;
  onClickCallback: any;
}

const isMyOffer = (offer: any, meQuery: any) => {
  return offer.creator && meQuery.data.me.id === offer.creator.id;
};

const SingleConversationSummary = (props: SingleConversationSummaryProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  if (loggedQuery.loading) return null;
  return (
    <Col
      onClick={() => props.onClickCallback(props.conversation.offer)}
      xs
      md={10}
    >
      <Row>
        <Col md={2}>
          <Image
            src={props.conversation.offer.car.photos[0]}
            thumbnail
            roundedCircle
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <Row>
                {isMyOffer(props.conversation.offer, loggedQuery)
                  ? props.conversation.buyer.lastName
                  : props.conversation.seller.lastName}
                ,
                {isMyOffer(props.conversation.offer, loggedQuery)
                  ? props.conversation.buyer.firstName
                  : props.conversation.seller.firstName}
              </Row>
              <Row>
                {props.conversation.offer.car.manufacturer.name.toUpperCase()}{' '}
                {props.conversation.offer.car.model.name.toUpperCase()}{' '}
                {props.conversation.offer.car.year}
              </Row>
              <Row>
                <div>{props.conversation.offer.price}$</div>
              </Row>
              <Row>
                {props.conversation.messages[
                  props.conversation.messages.length - 1
                ].text !== ''
                  ? props.conversation.messages[
                      props.conversation.messages.length - 1
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
