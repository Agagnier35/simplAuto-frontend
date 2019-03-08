import gql from 'graphql-tag';

export const AD_DETAIL_QUERY = gql`
  query AD_DETAIL_QUERY($id: ID!) {
    ad(id: $id) {
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
      isUrgent
      isFirst
      status
      offers {
        id
        car {
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
          mileage
          photos
          features {
            id
            name
            category {
              id
              name
            }
          }
        }
        price
      }
    }
  }
`;
