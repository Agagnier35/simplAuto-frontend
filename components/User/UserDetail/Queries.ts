import gql from 'graphql-tag';
export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      firstName
      email
      clientType
      lastName
      createdAt
      status
      carCount
      offerCount
      adCount
      cars {
        id
        mileage
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
        offers {
          id
        }
      }

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

      ads {
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
