import gql from 'graphql-tag';

export const ALL_ADS_QUERY = gql`
  {
    homePageAds {
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
          type
        }
      }
      urgentExpiry
      topExpiry
      status
      offerCount
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
`;
