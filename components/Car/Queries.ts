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
      offers {
        id
        ad {
          id
        }
        price
        addons {
          id
          name
          rankValue
        }
      }
    }
  }
`;

export const MATCHING_ADS_QUERY = gql`
  {
    ads {
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
    }
  }
`;
