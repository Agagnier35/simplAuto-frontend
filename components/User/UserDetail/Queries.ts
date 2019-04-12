import gql from 'graphql-tag';
export const USER_QUERY = gql`
  query USER_QUERY(
    $id: ID!
    $offerPageNumber: Int
    $offerPageSize: Int
    $adPageNumber: Int
    $adPageSize: Int
    $carPageNumber: Int
    $carPageSize: Int
  ) {
    user(
      id: $id
      offerPageNumber: $offerPageNumber
      offerPageSize: $offerPageSize
      adPageNumber: $adPageNumber
      adPageSize: $adPageSize
      carPageNumber: $carPageNumber
      carPageSize: $carPageSize
    ) {
      id
      firstName
      email
      clientType
      lastName
      companyName
      createdAt
      status
      carCount
      offerCount
      adCount
      cars(pageNumber: $carPageNumber, pageSize: $carPageSize) {
        id
        mileage
        owner {
          id
        }
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
        description
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
        }
      }

      offers(pageNumber: $offerPageNumber, pageSize: $offerPageSize) {
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
          urgentExpiry
          topExpiry
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
              year
              mileage
              photos
            }
          }
        }
        price
      }

      ads(pageNumber: $adPageNumber, pageSize: $adPageSize) {
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
  }
`;
