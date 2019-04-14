import gql from 'graphql-tag';

export const PAGE_CARS_QUERY = gql`
  query PAGE_CARS_QUERY($pageNumber: Int, $pageSize: Int) {
    me {
      id
      carCount
      permissions
      carLimit
      cars(pageNumber: $pageNumber, pageSize: $pageSize) {
        id
        owner {
          id
        }
        mileage
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
