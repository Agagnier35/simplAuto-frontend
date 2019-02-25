import gql from 'graphql-tag';

export const OFFER_ADDONS_QUERY = gql`
  query {
    offerAddons {
      id
      name
      rankValue
    }
  }
`;
