import React from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';
import { useQuery } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../../../General/Header';
import { Col, Row } from 'react-bootstrap';
import Loading from '../../../../General/Loading';
import ErrorMessage from '../../../../General/ErrorMessage';
import { ContainerConversation, Body, Header, Title } from './style';

export interface SingleConversationSummaryProps {
  conversation: any;
  onClickCallback: any;
}

const SingleConversationSummary = (props: SingleConversationSummaryProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);

  if (loggedQuery.loading) return <Loading />;
  if (loggedQuery.error) return <ErrorMessage error={loggedQuery.error} />;

  function handleSelectConvo() {
    props.onClickCallback(props.conversation);
  }

  return (
    <ContainerConversation onClick={() => handleSelectConvo()}>
      <Body>
        <img src={props.conversation.offer.car.photos[0]} />
        <Header>
          <Title className="portlet-title">
            <div>
              {props.conversation.offer.car.manufacturer.name}{' '}
              {props.conversation.offer.car.model.name}
            </div>
          </Title>
          <Col xs md={15}>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={12}>
                    <Row>
                      <div>
                        {'from: '}
                        {props.conversation.seller.firstName}{' '}
                        {props.conversation.seller.lastName}
                      </div>
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
