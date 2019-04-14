import gql from 'graphql-tag';

export const UPDATE_AD_QUERY = gql`
  query UPDATE_AD_QUERY($id: ID!) {
    ad(id: $id) {
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
          type
        }
      }
    }
  }
`;
