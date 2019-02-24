import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import { Ad, CarFeature } from '../../generated/graphql';
import gql from 'graphql-tag';
import Select from '../Select';
import GeneralModal, { ModalConcern, ModalAction } from '../GeneralModal';
import Router from 'next/router';
import { useMutation } from 'react-apollo-hooks';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
  adsQuery: any;
}

interface AdSummaryOption {
  action: () => void;
  label: string;
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
  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: { id: ad.id },
    refetchQueries: [{ query: adsQuery, variables: { id: ad.id } }],
  });

  function handleChange(option: AdSummaryOption) {
    option.action();
  }

  function hasPermission() {
    return ad.creator && ad.creator.id != null;
  }

  async function handleDeleteAd(deleteAd: any) {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  return (
    <>
      <GeneralModal
        modalSubject={ModalConcern.ad}
        actionType={ModalAction.delete}
        show={modalShow}
        onClose={() => setModalShow(false)}
        onConfirm={() => handleDeleteAd(deleteAd)}
      />
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
                handleChange={(option: AdSummaryOption) => handleChange(option)}
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
    </>
  );
};

export default multi(AdSummary);
