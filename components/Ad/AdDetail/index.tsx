import React, { useState } from 'react';
import { Card, ListGroup, CardDeck, Button, Dropdown } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { CarFeature, Offer } from '../../../generated/graphql';
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
import Link from 'next/link';
import { AdPortlet, More } from '../AdSummary/styles';
import GeneralAdInfos from '../AdSummary/GeneralAdInfos';
import AdFeatures from '../AdSummary/AdFeatures';
import { IoIosMore as MoreIcon } from 'react-icons/io';

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

  const { GeneralModalContent, carCategory } = translations;
  const { data, loading, error } = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID },
  });

  function hasPermission() {
    return data && data.ad && data.ad.creator != null;
  }

  function getTitle() {
    let title = '';
    const ad = data.ad;
    if (ad.manufacturer) {
      title += ad.manufacturer.name;

      if (ad.model) {
        title += ` ${ad.model.name}`;
      }
    } else if (ad.category) {
      title += carCategory[ad.category.name];
    } else {
      title += 'My ad';
    }
    return title;
  }

  const pages = [<GeneralAdInfos ad={data.ad} />];

  if (data.ad && data.ad.features && data.ad.features.length > 0) {
    pages.push(<AdFeatures ad={data.ad} />);
  }

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
        <AdPortlet
          title={getTitle()}
          href={{ pathname: '/adDetail', query: { id: data.ad.id } }}
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
                    {GeneralModalContent.delete}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          }
        />
        <Card>
          <Card.Header> {translations.general.offers}</Card.Header>
          <ListGroup>
            {data.ad.offers &&
              data.ad.offers.map((offer: Offer) => (
                <ListGroup.Item key={offer.id}>
                  <Link href={{ pathname: '/offer', query: { id: offer.id } }}>
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
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </>
  );
};
export default multi(AdDetail);
