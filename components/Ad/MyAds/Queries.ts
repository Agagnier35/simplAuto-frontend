import gql from 'graphql-tag';
export const PAGE_ADS_QUERY = gql`
  query PAGE_ADS_QUERY($pageNumber: Int, $pageSize: Int) {
    me {
      id
      adCount
      ads(pageNumber: $pageNumber, pageSize: $pageSize) {
        id
        creator {
          id
        }
        priceLowerBound
        priceHigherBound
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
        mileageLowerBound
        mileageHigherBound
        yearLowerBound
        yearHigherBound
        features {
          id
          name
          category {
            id
            name
          }
        }
        status
        offers {
          id
          price
          car {
            id
            photos
            manufacturer {
              id
              name
            }
            model {
              id
              name
            }
            year
            mileage
          }
        }
      }
    }
  }
`;
