import gql from 'graphql-tag';

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CREATE_CONVERSATION_MUTATION($offerID: ID!) {
    createConversation(offerID: $offerID) {
      id
    }
  }
`;

export const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DELETE_NOTIFICATION_MUTATION($id: ID!) {
    deleteNotification(id: $id) {
      id
    }
  }
`;

export const ACCEPT_OFFER_MUTATION = gql`
  mutation ACCEPT_OFFER_MUTATION($id: ID!) {
    acceptOffer(id: $id) {
      id
    }
  }
`;
