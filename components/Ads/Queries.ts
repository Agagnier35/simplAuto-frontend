import gql from 'graphql-tag';

export const ALL_ADS_QUERY = gql`
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
