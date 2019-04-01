import gql from 'graphql-tag';
export const USERS_QUERY = gql`
  query USERS_QUERY($where: UserWhereInput!, $pageNumber: Int, $pageSize: Int) {
    users(where: $where, pageNumber: $pageNumber, pageSize: $pageSize) {
      count
      users {
        id
        firstName
        lastName
        companyName
        clientType
        email
        gender
        adCount
        carCount
        offerCount
        createdAt
        permissions
        status
      }
    }
  }
`;
