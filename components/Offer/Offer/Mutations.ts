import gql from 'graphql-tag';

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CREATE_CONVERSATION_MUTATION($offerID: ID!) {
    createConversation(offerID: $offerID) {
      id
      status
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

export const REFUSE_OFFER_MUTATION = gql`
  mutation REFUSE_OFFER_MUTATION($id: ID!) {
    refuseOffer(id: $id) {
      id
    }
  }
`;

export const DELETE_OFFER_MUTATION = gql`
  mutation DELETE_OFFER_MUTATION($id: ID!) {
    deleteOffer(id: $id) {
      id
    }
  }
`;

export const ACCEPT_OFFER_EMAIL_MUTATION = gql`
  mutation ACCEPT_OFFER_EMAIL_MUTATION($id: ID!) {
    sendNotificationEmail(id: $id)
  }
`;
