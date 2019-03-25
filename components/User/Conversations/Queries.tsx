import gql from 'graphql-tag';

export const GET_USER_CONVERSATIONS_QUERY = gql`
  query {
    me {
      id
      conversations
    }
  }
`;
