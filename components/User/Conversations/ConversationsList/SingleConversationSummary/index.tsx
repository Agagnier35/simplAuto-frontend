// Ceci est le component qui recoit la liste des conversations et les display au format de linkedin.
import React, { Component } from 'react';
import { multiUpdater } from '../../../../../lib/MultiLang';
import Link from 'next/link';
import { Col, Row, Image } from 'react-bootstrap';
import AdSummary from '../../../../Ad/AdSummary';
import { ButtonRow } from '../../../../Ad/AdSummary/styles';

const style = {
  'background-color': 'white',
};

// Il faut pouvoir déterminer qui est la personne qui a send le message.

class SingleConversationSummary extends Component {
  state = {};

  render = () => {
    const { conversation }: any = this.props;
    console.log(conversation);
    return (
      <Col xs md={10}>
        <Row>
          <Col md={2}>
            <Image
              src={conversation.offer.car.photos[0]}
              thumbnail
              roundedCircle
            />
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <Row>
                  {conversation.buyer.lastName},{conversation.buyer.firstName}
                </Row>
                <Row>
                  {conversation.offer.car.manufacturer.name.toUpperCase()}{' '}
                  {conversation.offer.car.model.name.toUpperCase()}{' '}
                  {conversation.offer.car.year}
                </Row>
                <Row>
                  <div>{conversation.offer.price}$</div>
                </Row>
                <Row>
                  {conversation.messages[conversation.messages.length - 1]
                    .text !== ''
                    ? conversation.messages[conversation.messages.length - 1]
                        .text
                    : `Image sent.`}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };
}

export default multiUpdater(SingleConversationSummary);
