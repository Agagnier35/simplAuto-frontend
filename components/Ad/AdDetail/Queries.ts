import gql from 'graphql-tag';

export const AD_DETAIL_QUERY = gql`
  query AD_DETAIL_QUERY($id: ID!, $pageNumber: Int, $pageSize: Int) {
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
      offerCount
      offers(pageNumber: $pageNumber, pageSize: $pageSize) {
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

export const AD_OFFER_SUGGESTION_QUERY = gql`
  query AD_OFFER_SUGGESTION_QUERY($id: ID!, $pageNumber: Int, $pageSize: Int) {
    suggestions(id: $id, pageNumber: $pageNumber, pageSize: $pageSize) {
      position
      score
      total_length
      offer {
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
