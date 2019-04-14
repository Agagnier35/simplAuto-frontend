import React, { useState, ReactNode } from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Ad, Offer } from '../../../generated/graphql';
import { useMutation } from 'react-apollo-hooks';
import Router from 'next/router';
import GeneralModal, {
  MainAppObject,
  ModalAction,
} from '../../General/GeneralModal';
import GeneralAdInfos from './GeneralAdInfos';
import AdFeatures from './AdFeatures';
import { AdPortlet } from './styles';
import AdOffers from './AdOffers';
import moment from 'moment';
import { AD_DELETE_MUTATION } from '../AdDetail';
import { FaTrophy } from 'react-icons/fa';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
  adsQuery: any;
  right?: ReactNode;
  offer?: Offer;
}

const AdSummary = ({
  translations,
  ad,
  adsQuery,
  right,
  offer,
}: AdSummaryProps) => {
  const { carCategory } = translations;

  const [modalShow, setModalShow] = useState(false);
  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: { id: ad.id },
    refetchQueries: [{ query: adsQuery, variables: { id: ad.id } }],
  });

  function getTitle() {
    let title = '';
    if (ad.manufacturer) {
      title += ad.manufacturer.name;

      if (ad.model) {
        title += ` ${ad.model.name}`;
      }
    } else if (ad.category) {
      title += carCategory[ad.category.name];
    } else {
      title += translations.general.anything;
    }
    return title;
  }

  async function handleDeleteAd() {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  function isUrgent(ad: Ad) {
    if (!ad.urgentExpiry) {
      return false;
    }
    const a = moment(Date.now());
    const b = new Date(ad.urgentExpiry);

    return a.diff(b, 'days') < 7;
  }

  function isTop(ad: Ad) {
    if (!ad.topExpiry) {
      return false;
    }
    const a = moment(Date.now());
    const b = new Date(ad.topExpiry);

    return a.diff(b, 'days') < 7;
  }

  const pages = [<GeneralAdInfos ad={ad} right={right} offer={offer} />];

  if (ad.features && ad.features.length > 0) {
    pages.push(<AdFeatures ad={ad} />);
  }
  pages.push(<AdOffers ad={ad} />);

  return (
    <>
      <GeneralModal
        modalSubject={MainAppObject.ad}
        actionType={ModalAction.delete}
        show={modalShow}
        onClose={() => setModalShow(false)}
        onConfirm={() => handleDeleteAd()}
      />
      <AdPortlet
        isUrgent={isUrgent(ad)}
        title={
          <>
            {isTop(ad) && (
              <FaTrophy style={{ marginRight: '1rem', color: '#ffc107' }} />
            )}
            {getTitle()}
          </>
        }
        href={
          offer
            ? { pathname: '/offer', query: { id: offer.id } }
            : { pathname: '/adDetail', query: { id: ad.id } }
        }
        interval={3000}
        pages={pages}
      />
    </>
  );
};

export default multi(AdSummary);
