import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import { ButtonToolbar, Button, Card, ButtonGroup } from 'react-bootstrap';
import { MainAppObject } from '../GeneralModal';
import CarSummary from '../../Car/CarSummary';
import AdSummary from '../../Ad/AdSummary';
import { Ad, Car } from '../../../generated/graphql';
import { ALL_MY_ADS_QUERY } from '../../Ad/MyAds/Queries';
import PagingStyle from './style';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PagingViewvProps {
  objList: any[];
  type: MainAppObject;
  toggleModal: (...params: any) => void;
}

const PagingView = ({ objList, type }: PagingViewvProps) => {
  function getDisplayList() {
    let item = [];
    switch (type) {
      case MainAppObject.ad:
        objList.map((ad: Ad) =>
          item.push(
            <AdSummary adsQuery={ALL_MY_ADS_QUERY} key={ad.id} ad={ad} />,
          ),
        );
        break;
      case MainAppObject.car:
        objList.map((car: Car) =>
          item.push(<CarSummary key={car.id} car={car} />),
        );
        break;
      case MainAppObject.offer:
        //TODO: add offer summary when implemented
        objList.map((offer: any) => item.push(<p>lol</p>));
        item.push(<p>not implemented</p>);
        break;
    }
    return item;
  }

  const [pageNumber, setPageNumber] = useState(1);

  let pageTracker = 1;

  function onNext() {
    pageTracker = pageNumber + 1;
    setPageNumber(pageTracker);
  }

  function onBack() {
    if (pageNumber > 1) {
      pageTracker = pageNumber - 1;
    }
    setPageNumber(pageTracker);
  }

  return (
    <PagingStyle>
      <Card className="mainComponent">
        {getDisplayList()}
        <ButtonToolbar className="centerButtonToolBar">
          <Button variant="light" onClick={onBack}>
            <FaArrowLeft />
          </Button>
          {pageNumber}
          <Button variant="light" onClick={onNext}>
            <FaArrowRight />
          </Button>
        </ButtonToolbar>
      </Card>
    </PagingStyle>
  );
};

export default multi(PagingView);
