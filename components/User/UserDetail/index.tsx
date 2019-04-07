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
import { useQuery, useMutation } from 'react-apollo-hooks';
import { USER_QUERY } from './Queries';
import { paging5pages } from '../../General/Preferences';
import Paging from '../../General/Paging';
import Loading from '../../General/Loading';
import { AD_DELETE_MUTATION } from '../../Ad/AdDetail';
import { DELETE_CAR_MUTATION } from '../../Car/CarDetails';
import { DELETE_OFFER_MUTATION } from '../../Offer/Offer/Mutations';
import GeneralModal, {
  ModalAction,
  MainAppObject,
} from '../../General/GeneralModal';

interface UserDetailProps extends MultiProps {
  query: { id: string };
  userSSR: User;
}

const UserDetail = ({ translations, query, userSSR }: UserDetailProps) => {
  const [offerPageIndex, setOfferPageIndex] = useState(0);
  const [deleteModalSubject, setDeleteModalSubject] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [adPageIndex, setAdPageIndex] = useState(0);
  const [carPageIndex, setCarPageIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(getInitialTabIndex());
  const userQuery = useQuery(USER_QUERY, {
    variables: {
      id: query.id,
      offerPageSize: paging5pages,
      offerPageNumber: offerPageIndex,
      adPageNumber: adPageIndex,
      adPageSize: paging5pages,
      carPageNumber: carPageIndex,
      carPageSize: paging5pages,
    },
  });

  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    update: updateCacheAfterDeleteAd,
  });

  function updateCacheAfterDeleteAd(cache: any, payload: any) {
    const cacheQuery = {
      query: USER_QUERY,
      variables: {
        id: query.id,
        offerPageSize: paging5pages,
        offerPageNumber: offerPageIndex,
        adPageNumber: adPageIndex,
        adPageSize: paging5pages,
        carPageNumber: carPageIndex,
        carPageSize: paging5pages,
      },
    };
    const data = cache.readQuery(cacheQuery);

    const id = payload.data.deleteAd.id;
    const ads = data.user.ads.filter((ad: Ad) => ad.id !== id);

    cache.writeQuery({
      ...cacheQuery,
      data: {
        ...data,
        user: { ...data.user, ads, adCount: data.user.adCount - 1 },
      },
    });
  }

  function updateCacheAfterDeleteOffer(cache: any, payload: any) {
    const cacheQuery = {
      query: USER_QUERY,
      variables: {
        id: query.id,
        offerPageSize: paging5pages,
        offerPageNumber: offerPageIndex,
        adPageNumber: adPageIndex,
        adPageSize: paging5pages,
        carPageNumber: carPageIndex,
        carPageSize: paging5pages,
      },
    };
    const data = cache.readQuery(cacheQuery);

    const id = payload.data.deleteOffer.id;
    const offers = data.user.offers.filter((offer: Offer) => offer.id !== id);

    cache.writeQuery({
      ...cacheQuery,
      data: {
        ...data,
        user: { ...data.user, offers, offerCount: data.user.offerCount - 1 },
      },
    });
  }

  const deleteOffer = useMutation(DELETE_OFFER_MUTATION, {
    update: updateCacheAfterDeleteOffer,
  });

  const user = userQuery.data.user;

  async function handleDelete() {
    if (deleteModalSubject === MainAppObject.ad) {
      await deleteAd({ variables: { id: deleteId } });
    } else if (deleteModalSubject === MainAppObject.offer) {
      await deleteOffer({ variables: { id: deleteId } });
    }
    setDeleteModalSubject('');
  }

  function getInitialTabIndex() {
    if (userSSR.offerCount > 0) {
      return 0;
    }
    if (userSSR.adCount > 0) {
      return 1;
    }
    if (userSSR.carCount > 0) {
      return 2;
    }
    return 3;
  }

  function toggleDelete(id: string, subject: string) {
    setDeleteModalSubject(subject);
    setDeleteId(id);
  }

  return (
    <div>
      <Breadcrumb>
        <Link href={{ pathname: '/admin' }} passHref>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>
          {userSSR.clientType === ClientType.Individual
            ? `${userSSR.firstName} ${userSSR.lastName}`
            : userSSR.companyName}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ marginBottom: '2rem' }}>
        <Card.Body>
          <UserSummary user={userSSR} />
        </Card.Body>
      </Card>
      {!userQuery.loading ? (
        <>
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
                        <Button
                          onClick={() =>
                            toggleDelete(offer.id, MainAppObject.offer)
                          }
                        >
                          Supprimer
                        </Button>
                      </>
                    }
                  />
                </div>
              ))}
              <Paging
                pageIndex={offerPageIndex}
                setPageIndex={setOfferPageIndex}
                maxItems={user.offerCount}
                itemsByPage={paging5pages}
              />
            </AdSummaries>
            <AdSummaries hidden={tabIndex !== 1}>
              {user.ads.map((ad: Ad) => (
                <div key={ad.id}>
                  <AdSummary
                    key={ad.id}
                    ad={ad}
                    right={
                      <>
                        <Button
                          onClick={() => toggleDelete(ad.id, MainAppObject.ad)}
                        >
                          Supprimer
                        </Button>
                      </>
                    }
                  />
                </div>
              ))}
              <Paging
                pageIndex={adPageIndex}
                setPageIndex={setAdPageIndex}
                maxItems={user.adCount}
                itemsByPage={paging5pages}
              />
            </AdSummaries>
            <GeneralModal
              modalSubject={deleteModalSubject}
              actionType={ModalAction.delete}
              show={deleteModalSubject !== ''}
              onClose={() => setDeleteModalSubject('')}
              onConfirm={() => handleDelete()}
            />
            <div hidden={tabIndex !== 2}>
              <CarList
                cars={user.cars}
                refetchQuery={{
                  query: USER_QUERY,
                  variables: {
                    id: query.id,
                    offerPageSize: paging5pages,
                    offerPageNumber: offerPageIndex,
                    adPageNumber: adPageIndex,
                    adPageSize: paging5pages,
                    carPageNumber: carPageIndex,
                    carPageSize: paging5pages,
                  },
                }}
              />
              <Paging
                pageIndex={carPageIndex}
                setPageIndex={setCarPageIndex}
                maxItems={user.carCount}
                itemsByPage={paging5pages}
              />
            </div>
          </Card>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default multi(UserDetail);
