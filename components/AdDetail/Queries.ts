import gql from 'graphql-tag';

export const AD_DETAIL_QUERY = gql`
  query AD_DETAIL_QUERY($id: ID!) {
    ad(id: $id) {
      id
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
        car {
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
        price
      }
    }
  }
`;
