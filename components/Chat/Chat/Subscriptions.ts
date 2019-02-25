import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION($conversationID: ID!) {
    messageSubscription(conversationID: $conversationID) {
      id
      text
      image
      sender {
        id
      }
    }
  }
`;
