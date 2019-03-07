import gql from 'graphql-tag';

export const CAR_BY_ID = gql`
  query CAR_BY_ID($id: ID!) {
    car(id: $id) {
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
    }
  }
`;
