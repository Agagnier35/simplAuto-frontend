import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Ad } from '../../../generated/graphql';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import GeneralModal, {
  ModalConcern,
  ModalAction,
} from '../../General/GeneralModal';
import GeneralAdInfos from './GeneralAdInfos';
import AdFeatures from './AdFeatures';
import { IoIosMore as MoreIcon } from 'react-icons/io';
import { More, AdPortlet } from './styles';

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

  async function handleDeleteAd(deleteAd: any) {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  const pages = [<GeneralAdInfos ad={ad} />];

  if (ad.features && ad.features.length > 0) {
    pages.push(<AdFeatures ad={ad} />);
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
      <AdPortlet
        title={getTitle()}
        href={{ pathname: '/adDetail', query: { id: ad.id } }}
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
                <Dropdown.Item onClick={() => console.log(modalShow)}>
                  {general.options.modify}
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
