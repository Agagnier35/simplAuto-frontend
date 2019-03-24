import gql from 'graphql-tag';

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CREATE_CONVERSATION_MUTATION($offerID: ID!) {
    createConversation(offerID: $offerID) {
      id
    }
  }
`;
