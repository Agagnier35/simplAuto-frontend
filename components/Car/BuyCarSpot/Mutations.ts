import gql from 'graphql-tag';

export const BUY_CAR_SPOT_MUTATION = gql`
  mutation BUY_CAR_SPOT_MUTATION($stripeToken: String!, $amount: Int!) {
    buyCarSpot(stripeToken: $stripeToken, amount: $amount) {
      id
    }
  }
`;
