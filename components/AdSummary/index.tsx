import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import { Ad, CarFeature } from '../../generated/graphql';
import gql from 'graphql-tag';
import Select from '../Select';
import { JSXAttribute } from 'babel-types';
import GeneralModal from '../GeneralModal';
import Router from 'next/router';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
  adsQuery: any;
}

export const AD_DELETE_MUTATION = gql`
  mutation AD_DELETE_MUTATION($id: ID!) {
    deleteAd(id: $id) {
      id
    }
  }
`;

const AdSummary = ({ translations, ad, adsQuery }: AdSummaryProps) => {
  const {
    Ads,
    carCategory,
    carFeatureCategory,
    carFeature,
    general,
  } = translations;

  const [modalShow, setModalShow] = useState(false);

  function handleChange(option: JSXAttribute) {
    option.action();
  }

  function hasPermission() {
    return ad.creator && ad.creator.id != null;
  }

  async function handleDeleteCar(deleteCar: any) {
    await deleteCar();
    setModalShow(false);
    Router.push('/myAds');
  }

  return (
    <Mutation
      mutation={AD_DELETE_MUTATION}
      variables={{ id: ad.id }}
      refetchQueries={[{ query: adsQuery }]}
    >
      {deleteAd => {
        <GeneralModal
          modalSubject="ad"
          actionType="delete"
          show={modalShow}
          onClose={setModalShow(modalShow)}
          onConfirm={() => handleDeleteCar(deleteAd)}
        />;
        return (
          <div>
            {
              <Card>
                {hasPermission() && (
                  <Select
                    options={[
                      {
                        option: general.options.delete,
                        action: () => setModalShow(true),
                      },
                      {
                        option: general.options.modify,
                        action: () => console.log(modalShow),
                      },
                    ]}
                    accessor="option"
                    handleChange={(option: JSXAttribute) =>
                      handleChange(option)
                    }
                  />
                )}
                <ListGroup>
                  {ad.priceHigherBound && (
                    <ListGroup.Item>
                      {Ads.manufacturer}: {ad.priceHigherBound}
                    </ListGroup.Item>
                  )}
                  {ad.manufacturer && (
                    <ListGroup.Item>
                      {Ads.manufacturer}: {ad.manufacturer.name}
                    </ListGroup.Item>
                  )}
                  {ad.model && (
                    <ListGroup.Item>
                      {Ads.model}: {ad.model.name}
                    </ListGroup.Item>
                  )}
                  {ad.category && (
                    <ListGroup.Item>
                      {Ads.category}:{' '}
                      {carCategory[ad.category.name] || ad.category.name}
                    </ListGroup.Item>
                  )}
                  {ad.features &&
                    ad.features.map((feature: CarFeature) => (
                      <ListGroup.Item key={feature.category.name}>
                        {carFeatureCategory[feature.category.name]}:{' '}
                        {carFeature[feature.name] || feature.name}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card>
            }
          </div>
        );
      }}
    </Mutation>
  );
};
export default multi(AdSummary);
