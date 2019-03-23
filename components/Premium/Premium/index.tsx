import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { GO_PREMIUM_MUTATION } from './Mutations';
import { stripeKey } from '../../../config';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Permission } from '../../../generated/graphql';
import { Table } from 'react-bootstrap';

export interface PremiumProps extends MultiProps {}

const Premium = ({ translations }: PremiumProps) => {
  const { data, loading } = useQuery(LOGGED_IN_QUERY);
  const handleGoPremium = useMutation(GO_PREMIUM_MUTATION);
  const premium = translations.Premium;
  if (loading) return null;
  return (
    <div>
      <h1>{premium.Introduction}</h1>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>{premium.Features}</th>
            <th>Standard</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{premium.CarLimit}</td>
            <td>{premium.CarLimitUser}</td>
            <td>{premium.CarLimitPremium}</td>
          </tr>
          <tr>
            <td colSpan={3} align="center">
              {premium.Join}
            </td>
          </tr>
        </tbody>
      </Table>
      {data.me.permissions.indexOf(Permission.Premium) === -1 && (
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
      )}
    </div>
  );
};

export default multi(Premium);
