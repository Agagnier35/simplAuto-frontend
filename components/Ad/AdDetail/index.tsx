import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Offer } from '../../../generated/graphql';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { AD_DETAIL_QUERY } from './Queries';
import Router from 'next/router';
import GeneralModal, {
  ModalConcern,
  ModalAction,
} from '../../General/GeneralModal';
import gql from 'graphql-tag';
import { CarSummaries } from '../../Car/Car/styles';
import CarSummary from '../../Car/CarSummary';
import { Tab, TabBadge } from '../Ads/styles';
import AdSummary from '../AdSummary';

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

  async function handleDeleteAd(deleteAd: any) {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  const { carCategory } = translations;
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
        <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <AdSummary adsQuery={AD_DETAIL_QUERY} key={data.ad.id} ad={data.ad} />
        </Card>
        <Tab>
          Offres reçues{' '}
          {data.ad.offers && <TabBadge>{data.ad.offers.length}</TabBadge>}
        </Tab>
        <Card style={{ overflow: 'hidden' }}>
          <CarSummaries>
            {data.ad.offers &&
              data.ad.offers.map((offer: Offer) => (
                <CarSummary
                  key={offer.id}
                  car={offer.car}
                  price={offer.price}
                />
              ))}
          </CarSummaries>
        </Card>
      </div>
    </>
  );
};
export default multi(AdDetail);
