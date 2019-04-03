import React, { useState, ReactNode } from 'react';
import { Dropdown, Breadcrumb } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Ad, Offer } from '../../../generated/graphql';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import GeneralModal, {
  MainAppObject,
  ModalAction,
} from '../../General/GeneralModal';
import GeneralAdInfos from './GeneralAdInfos';
import AdFeatures from './AdFeatures';
import { IoIosMore as MoreIcon } from 'react-icons/io';
import { More, AdPortlet } from './styles';
import AdOffers from './AdOffers';
import moment from 'moment';
import Link from 'next/link';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
  adsQuery: any;
  right?: ReactNode;
  offer?: Offer;
}

export const AD_DELETE_MUTATION = gql`
  mutation AD_DELETE_MUTATION($id: ID!) {
    deleteAd(id: $id) {
      id
    }
  }
`;

const AdSummary = ({
  translations,
  ad,
  adsQuery,
  right,
  offer,
}: AdSummaryProps) => {
  const { carCategory, general } = translations;

  const [modalShow, setModalShow] = useState(false);
  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: { id: ad.id },
    refetchQueries: [{ query: adsQuery, variables: { id: ad.id } }],
  });

  function hasPermission() {
    return ad.creator && ad.creator.id != null;
  }

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
      title += 'Anything';
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

  const pages = [<GeneralAdInfos ad={ad} right={right} offer={offer} />];

  if (ad.features && ad.features.length > 0) {
    pages.push(<AdFeatures ad={ad} />);
  }

  if (ad.offers && ad.offers.length > 0) {
    pages.push(<AdOffers ad={ad} />);
  }

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
        title={getTitle()}
        href={
          offer
            ? { pathname: '/offer', query: { id: offer.id } }
            : { pathname: '/adDetail', query: { id: ad.id } }
        }
        interval={3000}
        pages={pages}
        left={
          hasPermission() && (
            <Dropdown>
              <More size="sm" variant="light" id="dropdown-basic">
                <MoreIcon />
              </More>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setModalShow(true)}>
                  {general.options.delete}
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    href={{
                      pathname: '/updateAd',
                      search: `?adId=${ad.id}`,
                    }}
                    passHref
                  >
                    {general.options.modify}
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        }
      />
    </>
  );
};

export default multi(AdSummary);
