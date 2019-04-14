import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { stripeKey } from '../../../config';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { PRICES_QUERY } from '../../Premium/Premium/Queries';
import { Prices, Ad } from '../../../generated/graphql';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { ButtonWrapper } from './styles';
import { BUY_TOP_AD_MUTATION, BUY_URGENT_AD_MUTATION } from './Mutations';
import { FaTrophy, FaExclamationCircle, FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import GeneralModal, {
  MainAppObject,
  ModalAction,
} from '../../General/GeneralModal';
import { AD_DELETE_MUTATION } from '../AdDetail';
import Router from 'next/router';
import { AD_DETAIL_QUERY } from '../AdDetail/Queries';
import { paging5pages } from '../../General/Preferences';
import moment from 'moment';
import Link from 'next/link';

export interface MyAdOptionsProps extends MultiProps {
  ad: Ad;
}

const MyAdOptions = ({ translations, ad }: MyAdOptionsProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  const pricesQuery = useQuery(PRICES_QUERY);
  const handleBuyTopAd = useMutation(BUY_TOP_AD_MUTATION);
  const handleBuyUrgentAd = useMutation(BUY_URGENT_AD_MUTATION);
  const [modalShow, setModalShow] = useState(false);

  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: {
      id: ad.id,
    },
    refetchQueries: [
      {
        query: AD_DETAIL_QUERY,
        variables: { id: ad.id, pageNumber: 0, pageSize: paging5pages },
      },
    ],
  });

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

  if (loggedQuery.loading || pricesQuery.loading) return null;

  const prices: Prices = pricesQuery.data.getPrices;

  return (
    <>
      <ButtonWrapper>
        <GeneralModal
          modalSubject={MainAppObject.ad}
          actionType={ModalAction.delete}
          show={modalShow}
          onClose={() => setModalShow(false)}
          onConfirm={() => handleDeleteAd()}
        />
        {!isTop(ad) && (
          <StripeCheckout
            amount={prices.topAd}
            name={translations.Stripe.TopAdName}
            description={translations.Stripe.TopAdDescription}
            currency="CAD"
            email={loggedQuery.data.me.email}
            stripeKey={stripeKey}
            token={(res: any) =>
              handleBuyTopAd({ variables: { stripeToken: res.id, id: ad.id } })
            }
          >
            <Button variant="primary">
              {translations.ad.buyTopAd} <FaTrophy />
            </Button>
          </StripeCheckout>
        )}

        {!isUrgent(ad) && (
          <StripeCheckout
            amount={prices.urgentAd}
            name={translations.Stripe.UrgentAdName}
            description={translations.Stripe.UrgentAdDescription}
            currency="CAD"
            email={loggedQuery.data.me.email}
            stripeKey={stripeKey}
            token={(res: any) =>
              handleBuyUrgentAd({
                variables: { stripeToken: res.id, id: ad.id },
              })
            }
          >
            <Button variant="secondary">
              {translations.ad.buyUrgentAd} <FaExclamationCircle />
            </Button>
          </StripeCheckout>
        )}

        <Button variant="danger" onClick={() => setModalShow(true)}>
          {translations.general.delete} <MdCancel />
        </Button>
        <Link href={{ pathname: '/updateAd', query: { id: ad.id } }}>
          <Button variant="secondary" as="a">
            {translations.GeneralModalContent.edit} <FaEdit />
          </Button>
        </Link>
      </ButtonWrapper>
    </>
  );
};

export default multi(MyAdOptions);
