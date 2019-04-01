import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IS_LOGGED_IN {
    me {
      id
    }
  }
`;
