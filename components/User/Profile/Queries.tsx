import gql from 'graphql-tag';

export const GET_USER_INFO_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
      email
      location
      language
      birthDate {
        day
        month
        year
      }
      gender
    }
  }
`;
