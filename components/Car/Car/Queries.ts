import gql from 'graphql-tag';

export const CAR_BY_ID = gql`
  query CAR_BY_ID($id: ID!, $pageNumberOffer: Int, $pageSizeOffer: Int) {
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
      description
      features {
        id
        name
        category {
          id
          name
        }
      }
      offerCount
      offers(pageNumber: $pageNumberOffer, pageSize: $pageSizeOffer) {
        id
        ad {
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
  query MATCHING_ADS_QUERY($id: ID!, $pageNumberAds: Int, $pageSizeAds: Int) {
    adSuggestion(id: $id, pageNumber: $pageNumberAds, pageSize: $pageSizeAds) {
      score
      ad {
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
  }
`;
