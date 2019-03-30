import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { BUY_CAR_SPOT_MUTATION } from './Mutations';
import { stripeKey } from '../../../config';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { PRICES_QUERY } from '../../Premium/Premium/Queries';
import { Prices } from '../../../generated/graphql';
import { Button } from 'react-bootstrap';

export interface BuyCarSpotProps extends MultiProps {}

const BuyCarSpot = ({ translations }: BuyCarSpotProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  const pricesQuery = useQuery(PRICES_QUERY);
  const handleBuyCarSpot = useMutation(BUY_CAR_SPOT_MUTATION);

  if (loggedQuery.loading || pricesQuery.loading) return null;

  const prices: Prices = pricesQuery.data.getPrices;

  return (
    <div>
      {loggedQuery.data.me && (
        <StripeCheckout
          amount={prices.carSpot}
          name={translations.Stripe.CarSpotName}
          description={translations.Stripe.CarSpotDescription}
          currency="CAD"
          email={loggedQuery.data.me.email}
          stripeKey={stripeKey}
          token={(res: any) =>
            handleBuyCarSpot({ variables: { stripeToken: res.id, amount: 1 } })
          }
        >
          <Button>{translations.Stripe.CarSpotButton}</Button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default multi(BuyCarSpot);
