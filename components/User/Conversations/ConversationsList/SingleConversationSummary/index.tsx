import React from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../../../General/Header';
import { Col, Row, Nav } from 'react-bootstrap';
import Loading from '../../../../General/Loading';
import ErrorMessage from '../../../../General/ErrorMessage';
import { ContainerConversation, Body, Header, Title } from './style';
import Link from 'next/link';

export interface SingleConversationSummaryProps {
  conversation: any;
  onClickCallback: any;
}

const SingleConversationSummary = (props: SingleConversationSummaryProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  const isMyOffer = loggedQuery.data.me.id === props.conversation.seller.id;

  if (loggedQuery.loading) return <Loading />;
  if (loggedQuery.error) return <ErrorMessage error={loggedQuery.error} />;

  function handleSelectConvo() {
    props.onClickCallback(props.conversation);
  }

  function getSellerName() {
    return (
      'from: ' +
      props.conversation.seller.firstName +
      ' ' +
      props.conversation.seller.lastName
    );
  }

  function getBuyerName() {
    return (
      'to: ' +
      props.conversation.buyer.firstName +
      ' ' +
      props.conversation.buyer.lastName
    );
  }

  return (
    <ContainerConversation onClick={() => handleSelectConvo()}>
      <Body>
        <img src={props.conversation.offer.car.photos[0]} />
        <Header>
          <Title className="portlet-title">
            <div>
              <Link
                href={`/offer?id=${props.conversation.offer.id}`}
                passHref
                prefetch
              >
                <Nav.Item as="a">
                  {isMyOffer ? 'You have offered: ' : 'You have been offered: '}
                  {props.conversation.offer.car.manufacturer.name}{' '}
                  {props.conversation.offer.car.model.name}
                </Nav.Item>
              </Link>
            </div>
          </Title>
          <Col xs md={15}>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={12}>
                    <Row>
                      <div>{isMyOffer ? getBuyerName() : getSellerName()}</div>
                    </Row>
                    <Row>
                      <div>{props.conversation.offer.price}$</div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Header>
      </Body>
    </ContainerConversation>
  );
};

export default multiUpdater(SingleConversationSummary);
