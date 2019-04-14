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
import Link from 'next/link';
import { AD_DETAIL_QUERY } from '../AdDetail/Queries';
import { paging5pages } from '../../General/Preferences';

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
          <Button variant="secondary" style={{ margin: '0.5rem 0' }}>
            {translations.ad.buyUrgentAd} <FaExclamationCircle />
          </Button>
        </StripeCheckout>

        <ButtonToolbar>
          <Button variant="warning" onClick={() => setModalShow(true)}>
            {translations.general.delete} <MdCancel />
          </Button>

          <Link href={{ pathname: '/updateAd', query: { id: ad.id } }} passHref>
            <Button variant="secondary">
              {translations.GeneralModalContent.edit} <FaEdit />
            </Button>
          </Link>
        </ButtonToolbar>
      </ButtonWrapper>
    </>
  );
};

export default multi(MyAdOptions);
