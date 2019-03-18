import gql from 'graphql-tag';

export const GO_PREMIUM_MUTATION = gql`
  mutation GO_PREMIUM_MUTATION($stripeToken: String!) {
    goPremium(stripeToken: $stripeToken) {
      id
    }
  }
`;
