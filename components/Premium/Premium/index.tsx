import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { GO_PREMIUM_MUTATION } from './Mutations';
import { stripeKey } from '../../../config';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { PRICES_QUERY } from './Queries';
import { Prices, Permission } from '../../../generated/graphql';
import { Table } from 'react-bootstrap';
import { FaCheck as CheckMark, FaTimesCircle as XSign } from 'react-icons/fa';
import StyledForm from './style';

export interface PremiumProps extends MultiProps {}

const Premium = ({ translations }: PremiumProps) => {
  const loggedQuery = useQuery(LOGGED_IN_QUERY);
  const pricesQuery = useQuery(PRICES_QUERY);
  const handleGoPremium = useMutation(GO_PREMIUM_MUTATION);

  if (loggedQuery.loading || pricesQuery.loading) return null;
  const prices: Prices = pricesQuery.data.getPrices;
  const user = loggedQuery.data.me;
  const premium = translations.Premium;

  return (
    <StyledForm>
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
            <td>{premium.AdCreation}</td>
            <td>
              <CheckMark className="fa-check" />
            </td>
            <td>
              <CheckMark className="fa-check" />
            </td>
          </tr>
          <tr>
            <td>{premium.CarCreation}</td>
            <td>
              <CheckMark className="fa-check" />
            </td>
            <td>
              <CheckMark className="fa-check" />
            </td>
          </tr>
          <tr>
            <td>{premium.CarLimit}</td>
            <td align="center">{premium.CarLimitUser}</td>
            <td align="center">{premium.CarLimitPremium}</td>
          </tr>
          <tr>
            <td>{premium.BasicStatistics}</td>
            <td>
              <CheckMark className="fa-check" />
            </td>
            <td>
              <CheckMark className="fa-check" />
            </td>
          </tr>
          <tr>
            <td>{premium.PremiumStatistics}</td>
            <td>
              <XSign className="fa-x" />
            </td>
            <td>
              <CheckMark className="fa-check" />
            </td>
          </tr>
          <tr>
            <td colSpan={3} align="center">
              {premium.Join}
            </td>
          </tr>
        </tbody>
      </Table>
      {!user.permissions.includes(Permission.Premium) && (
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
    </StyledForm>
  );
};

export default multi(Premium);
