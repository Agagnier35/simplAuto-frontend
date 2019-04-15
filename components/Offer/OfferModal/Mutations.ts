import gql from 'graphql-tag';

export const CREATE_OFFER_MUTATION = gql`
  mutation CREATE_OFFER_MUTATION($data: OfferCreateInput!) {
    createOffer(data: $data) {
      id
      ad {
        id
      }
    }
  }
`;

export const UPDATE_OFFER_MUTATION = gql`
  mutation UPDATE_OFFER_MUTATION($data: OfferUpdateInput!) {
    updateOffer(data: $data) {
      id
    }
  }
`;
