import gql from 'graphql-tag';

export const CAR_BY_ID = gql`
  query CAR_BY_ID($id: ID!) {
    car(id: $id) {
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
      mileage
      photos
      features {
        name
        category {
          name
        }
      }
    }
  }
`;
