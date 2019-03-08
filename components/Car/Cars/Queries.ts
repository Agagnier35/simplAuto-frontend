import gql from 'graphql-tag';

export const MY_CARS_QUERY = gql`
  {
    me {
      id
      cars {
        id
        manufacturer {
          name
        }
        model {
          name
        }
        category {
          name
        }
        year
        description
        photos
      }
    }
  }
`;
