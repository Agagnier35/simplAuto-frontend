import React from 'react';
import { multi } from '../../../lib/MultiLang';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { Col, Row, Nav } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { ContainerConversation, Body, Header, Title } from './style';
import Link from 'next/link';
import { Conversation } from '../../../generated/graphql';
import Translations from '../../../lib/MultiLang/locales/types';

export interface SingleConversationSummaryProps {
  translations: Translations;
  conversation: Conversation;
  onClickCallback: (convo: Conversation) => void;
}

const SingleConversationSummary = ({
  conversation,
  onClickCallback,
  translations,
}: SingleConversationSummaryProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  const isMyOffer = loggedQuery.data.me.id === conversation.seller.id;

  if (loggedQuery.loading) return <Loading />;
  if (loggedQuery.error) return <ErrorMessage error={loggedQuery.error} />;

  function handleSelectConvo() {
    onClickCallback(conversation);
  }

  function getSellerName() {
    return (
      translations.offers.from +
      ': ' +
      conversation.seller.firstName +
      ' ' +
      conversation.seller.lastName
    );
  }

  function getBuyerName() {
    return (
      translations.offers.to +
      ': ' +
      conversation.buyer.firstName +
      ' ' +
      conversation.buyer.lastName
    );
  }

  return (
    <ContainerConversation onClick={() => handleSelectConvo()}>
      <Body>
        <img src={conversation.offer.car.photos[0]} />
        <Header>
          <Title className="portlet-title">
            <div>
              <Link
                href={`/offer?id=${conversation.offer.id}`}
                passHref
                prefetch
              >
                <Nav.Item as="a">
                  {isMyOffer
                    ? translations.offers.youHaveOffered + ': '
                    : translations.offers.youHaveBeenOffered + ': '}
                  {conversation.offer.car.manufacturer.name}{' '}
                  {conversation.offer.car.model.name}
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
                      <div>{conversation.offer.price}$</div>
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

export default multi(SingleConversationSummary);
