import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { GO_PREMIUM_MUTATION } from './Mutations';
import { stripeKey } from '../../../config';
import { multi, MultiProps } from '../../../lib/MultiLang';

export interface PremiumProps extends MultiProps {}

const Premium = ({ translations }: PremiumProps) => {
  const { data, loading } = useQuery(LOGGED_IN_QUERY);
  const handleGoPremium = useMutation(GO_PREMIUM_MUTATION);

  if (loading) return null;
  return (
    <div>
      <p>premium</p>
      <StripeCheckout
        amount={1000}
        name={translations.Stripe.PremiumName}
        description={translations.Stripe.PremiumDescription}
        currency="CAD"
        email={data.me.email}
        stripeKey={stripeKey}
        token={(res: any) =>
          handleGoPremium({ variables: { stripeToken: res.id } })
        }
      />
    </div>
  );
};

export default multi(Premium);
