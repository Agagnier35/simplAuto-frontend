import gql from 'graphql-tag';

export const BAN_USER_MUTATION = gql`
  mutation BAN_USER_MUTATION($id: ID!) {
    banUser(id: $id) {
      id
      status
    }
  }
`;
