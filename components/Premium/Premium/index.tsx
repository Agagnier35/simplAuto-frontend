import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { GO_PREMIUM_MUTATION } from './Mutations';
import { stripeKey } from '../../../config';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { premium } from '../../General/Preferences';
import { PRICES_QUERY } from './Queries';
import { Prices } from '../../../generated/graphql';

export interface PremiumProps extends MultiProps {}

const Premium = ({ translations }: PremiumProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  const pricesQuery = useQuery(PRICES_QUERY);
  const handleGoPremium = useMutation(GO_PREMIUM_MUTATION);

  if (loggedQuery.loading || pricesQuery.loading) return null;
  const prices: Prices = pricesQuery.data.getPrices;

  return (
    <div>
      <p>{premium}</p>
      {loggedQuery.data.me && (
        <StripeCheckout
          amount={prices.premiumAccount}
          name={translations.Stripe.PremiumName}
          description={translations.Stripe.PremiumDescription}
          currency="CAD"
          email={loggedQuery.data.me.email}
          stripeKey={stripeKey}
          token={(res: any) =>
            handleGoPremium({ variables: { stripeToken: res.id } })
          }
        />
      )}
    </div>
  );
};

export default multi(Premium);
