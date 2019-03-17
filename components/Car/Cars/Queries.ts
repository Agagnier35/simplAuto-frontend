import gql from 'graphql-tag';

export const PAGE_CARS_QUERY = gql`
  query PAGE_CARS_QUERY($pageNumber: Int, $pageSize: Int) {
    me {
      id
      carCount
      cars(pageNumber: $pageNumber, pageSize: $pageSize) {
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
