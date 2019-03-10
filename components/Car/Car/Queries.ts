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
  query CAR_BY_ID($pageNumberAds: Int, $pageSizeAds: Int) {
    ads(pageNumber: $pageNumberAds, pageSize: $pageSizeAds) {
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
