import React, { useState } from 'react';
import { Card, ListGroup, CardDeck, Button } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { CarFeature, Offer } from '../../generated/graphql';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { AD_DETAIL_QUERY } from './Queries';
import Router from 'next/router';
import GeneralModal, { ModalConcern, ModalAction } from '../GeneralModal';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export interface AdDetailProps {
  translations: Translations;
  adID: string;
}

export const AD_DELETE_MUTATION = gql`
  mutation AD_DELETE_MUTATION($id: ID!) {
    deleteAd(id: $id) {
      id
    }
  }
`;

const AdDetail = ({ translations, adID }: AdDetailProps) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: { id: adID },
  });
  function hasPermission(creator: string) {
    return creator != null;
  }

  async function handleDeleteAd(deleteAd: any) {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  const { carFeatureCategory, carFeature, GeneralModalContent } = translations;
  const { data, loading, error } = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID },
  });
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <div>
        <GeneralModal
          modalSubject={ModalConcern.ad}
          actionType={ModalAction.delete}
          show={modalShow}
          onClose={() => setModalShow(false)}
          onConfirm={() => handleDeleteAd(deleteAd)}
        />
        <CardDeck>
          <Card>
            <Card.Header>{translations.general.myAds}</Card.Header>
            <Card.Body>
                {hasPermission(data.ad.creator) && (
                    <Button variant="danger" onClick={() => setModalShow(true)}>
                        {GeneralModalContent.delete}
                    </Button>
                )}
              <div>
                {translations.Ads.manufacturer}:{' '}
                {data.ad.manufacturer ? data.ad.manufacturer.name : '-'}
              </div>
              <div>
                {translations.Ads.model}:{' '}
                {data.ad.model ? data.ad.model.name : '-'}
              </div>
              <div>
                {translations.Ads.category}:{' '}
                {data.ad.category ? data.ad.category.name : '-'}
              </div>
              <div>
                {translations.Ads.higherPrice}:{' '}
                {data.ad.priceHigherBound ? data.ad.priceHigherBound : '-'}
              </div>
              <div>
                {translations.Ads.lowerPrice}:{' '}
                {data.ad.priceLowerBound ? data.ad.priceLowerBound : '-'}
              </div>
              <div>
                {translations.Ads.higherMileage}:{' '}
                {data.ad.mileageHigherBound ? data.ad.mileageHigherBound : '-'}
              </div>
              <div>
                {translations.Ads.lowerMileage}:{' '}
                {data.ad.mileageLowerBound ? data.ad.mileageLowerBound : '-'}
              </div>
              <div>
                {translations.Ads.higherYear}:{' '}
                {data.ad.yearHigherBound ? data.ad.yearHigherBound : '-'}
              </div>
              <div>
                {translations.Ads.lowerYear}:{' '}
                {data.ad.yearLowerBound ? data.ad.yearLowerBound : '-'}
              </div>
              <ListGroup>
                {translations.Ads.features} :
                {data.ad.features &&
                  data.ad.features.map((feature: CarFeature) => (
                    <ListGroup.Item key={feature.category.name}>
                      {carFeatureCategory[feature.category.name]} :{' '}
                      {carFeature[feature.name] || feature.name}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header> {translations.general.offers}</Card.Header>
            <ListGroup>
              {data.ad.offers &&
                data.ad.offers.map((offer: Offer) => (
                  <ListGroup.Item key={offer.id}>
                    <Card>
                      {offer.car.photos.length > 0 ? (
                        <Card.Img variant="top" src={offer.car.photos[0]} />
                      ) : (
                        /* TODO: Change Placeholder */
                        <Card.Img
                          variant="top"
                          alt="No car photos placeholder"
                        />
                      )}
                    </Card>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </CardDeck>
      </div>
    </>
  );
};
export default multi(AdDetail);
