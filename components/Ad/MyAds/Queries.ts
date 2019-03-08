import gql from 'graphql-tag';
export const ALL_MY_ADS_QUERY = gql`
  query {
    me {
      id
      ads(pageNumber: number, pageSize: number) {
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
      }
    }
  }
`;
