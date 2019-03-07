import gql from 'graphql-tag';
export const ALL_MY_ADS_QUERY = gql`
  {
    me {
      id
      ads {
        id
        creator {
          id
        }
        priceLowerBound
        priceHigherBound
        manufacturer {
          name
        }
        model {
          name
        }
        category {
          name
        }
        mileageLowerBound
        mileageHigherBound
        yearLowerBound
        yearHigherBound
        features {
          name
          category {
            name
          }
        }
        isUrgent
        isFirst
        status
        offers {
          id
          price
          car {
            photos
            manufacturer {
              name
            }
            model {
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
