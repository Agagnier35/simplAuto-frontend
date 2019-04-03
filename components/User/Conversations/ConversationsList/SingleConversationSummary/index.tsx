// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';
// import { Col, Row, Image } from 'react-bootstrap';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../../../General/Header';
import Link from 'next/link';
import { ConversationPortlet } from './style';
import GeneralConversationDetails from './GeneralConversationDetails';

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

  const pages = [<GeneralConversationDetails conversationDetails={props} />];

  return (
    <div onClick={() => props.onClickCallback(props.conversation.offer)}>
      <ConversationPortlet
        {...props}
        title={`${props.conversation.offer.car.manufacturer.name} ${
          props.conversation.offer.car.model.name
        } ${props.conversation.offer.car.year}`}
        interval={3000}
        href={{
          pathname: '/offer',
          query: { id: props.conversation.offer.id },
        }}
        pages={pages}
        image={<img src={props.conversation.offer.car.photos[0]} />}
      />
    </div>
  );
};

export default multiUpdater(SingleConversationSummary);
