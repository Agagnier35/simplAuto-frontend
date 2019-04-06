import React, { useState } from 'react';
import { User, ClientType, Offer, Ad } from '../../../generated/graphql';
import UserSummary from '../UserSummary';
import { Card, Breadcrumb, Button } from 'react-bootstrap';
import { Tab, TabBadge, AdSummaries } from '../../Ad/Ads/styles';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Link from 'next/link';
import CarList from '../../Car/CarList';
import AdSummary from '../../Ad/AdSummary';
import { OfferPrice } from '../../Ad/AdSummary/styles';

interface UserDetailProps extends MultiProps {
  user: User;
}

const UserDetail = ({ user, translations }: UserDetailProps) => {
  const [tabIndex, setTabIndex] = useState(getInitialTabIndex());

  function getInitialTabIndex() {
    if (user.offerCount > 0) {
      return 0;
    }
    if (user.adCount > 0) {
      return 1;
    }
    if (user.carCount > 0) {
      return 2;
    }
    return 3;
  }

  return (
    <div>
      <Breadcrumb>
        <Link href={{ pathname: '/admin' }} passHref>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>
          {user.clientType === ClientType.Individual
            ? `${user.firstName} ${user.lastName}`
            : user.companyName}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ marginBottom: '2rem' }}>
        <Card.Body>
          <UserSummary user={user} />
        </Card.Body>
      </Card>
      <Tab
        className={tabIndex === 0 ? 'active' : ''}
        onClick={() => setTabIndex(0)}
        hidden={user.offerCount === 0}
      >
        {translations.general.offers}
        <TabBadge>{user.offerCount}</TabBadge>
      </Tab>
      <Tab
        className={tabIndex === 1 ? 'active' : ''}
        onClick={() => setTabIndex(1)}
        hidden={user.adCount === 0}
      >
        {translations.Ads.title}
        <TabBadge>{user.adCount}</TabBadge>
      </Tab>
      <Tab
        className={tabIndex === 2 ? 'active' : ''}
        onClick={() => setTabIndex(2)}
        hidden={user.carCount === 0}
      >
        {translations.cars.cars}
        <TabBadge>{user.carCount}</TabBadge>
      </Tab>
      <Card style={{ overflow: 'hidden' }}>
        <AdSummaries hidden={tabIndex !== 0}>
          {user.offers.map((offer: Offer) => (
            <div key={offer.ad.id}>
              <AdSummary
                key={offer.ad.id}
                ad={offer.ad}
                offer={offer}
                right={
                  <>
                    <OfferPrice style={{ marginTop: '1rem' }}>
                      {offer.price} $
                    </OfferPrice>
                  </>
                }
              />
            </div>
          ))}
          {/* <Paging
            pageIndex={pageIndexOffer}
            setPageIndex={setPageIndexOffer}
            maxItems={carQuery.data.car.offerCount}
            itemsByPage={paging10pages}
          /> */}
        </AdSummaries>
        <AdSummaries hidden={tabIndex !== 1}>
          {user.ads.map((ad: Ad) => (
            <div key={ad.id}>
              <AdSummary key={ad.id} ad={ad} right={<></>} />
            </div>
          ))}
          {/* <Paging
            pageIndex={pageIndexOffer}
            setPageIndex={setPageIndexOffer}
            maxItems={carQuery.data.car.offerCount}
            itemsByPage={paging10pages}
          /> */}
        </AdSummaries>
        <CarList cars={user.cars} hidden={tabIndex !== 2} />
      </Card>
    </div>
  );
};

export default multi(UserDetail);
