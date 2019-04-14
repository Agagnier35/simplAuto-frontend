import React from 'react';
import { multi } from '../../../lib/MultiLang';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { Col, Row, Nav, Button } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { ContainerConversation, Body, Header, Title } from './style';
import Link from 'next/link';
import { Conversation, Offer, User } from '../../../generated/graphql';
import Translations from '../../../lib/MultiLang/locales/types';

export interface SingleConversationSummaryProps {
  translations: Translations;
  conversation: Conversation;
  onClickCallback: (offer: Offer) => void;
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
    onClickCallback(conversation.offer);
  }

  function getUserName(user: User) {
    if (user.companyName !== '') {
      return user.companyName;
    } else {
      return user.firstName + ' ' + user.lastName;
    }
  }

  function getSellerName() {
    // return translations.offers.from + ': ' + getUserName(conversation.seller);
    return getUserName(conversation.seller);
  }

  function getBuyerName() {
    // return translations.offers.to + ': ' + getUserName(conversation.buyer);
    return getUserName(conversation.buyer);
  }

  return (
    <ContainerConversation onClick={() => handleSelectConvo()}>
      <Body>
        <img src={conversation.offer.car.photos[0]} />
        <Header>
          <Title className="portlet-title">
            <div>
              <Nav.Item>
                {isMyOffer
                  ? translations.offers.youHaveOffered + ': '
                  : translations.offers.youHaveBeenOffered + ': '}
                {conversation.offer.car.manufacturer.name}{' '}
                {conversation.offer.car.model.name}
              </Nav.Item>
            </div>
          </Title>
          <div>{isMyOffer ? getBuyerName() : getSellerName()}</div>
          <Link href={`/offer?id=${conversation.offer.id}`} passHref prefetch>
            <Button as="a" variant="success">
              Voir l'offre
            </Button>
          </Link>
        </Header>
      </Body>
    </ContainerConversation>
  );
};

export default multi(SingleConversationSummary);
