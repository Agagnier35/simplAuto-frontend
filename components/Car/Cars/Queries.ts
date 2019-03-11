import gql from 'graphql-tag';

export const MY_CARS_QUERY = gql`
  {
    me {
      id
      cars {
        id
        manufacturer {
          id
          name
        }
        model {
          id
          name
        }
        category {
          id
          name
        }
        year
        description
        photos
        offers {
          id
        }
      }
    }
  }
`;
