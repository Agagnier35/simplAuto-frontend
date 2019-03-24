import gql from 'graphql-tag';

export const PRICES_QUERY = gql`
  query PRICES_QUERY {
    getPrices {
      premiumAccount
      topAd
      carSpot
      urgentAd
    }
  }
`;
