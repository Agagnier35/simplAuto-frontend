import gql from 'graphql-tag';

export const BUY_TOP_AD_MUTATION = gql`
  mutation BUY_TOP_AD_MUTATION($stripeToken: String!, $id: ID!) {
    buyTopAd(stripeToken: $stripeToken, id: $id) {
      id
      topExpiry
    }
  }
`;

export const BUY_URGENT_AD_MUTATION = gql`
  mutation BUY_URGENT_AD_MUTATION($stripeToken: String!, $id: ID!) {
    buyUrgentAd(stripeToken: $stripeToken, id: $id) {
      id
      urgentExpiry
    }
  }
`;
