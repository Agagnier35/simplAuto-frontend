import gql from 'graphql-tag';
export const ALL_MY_ADS_QUERY = gql`
  {
    me {
      id
      ads {
        id
        priceLowerBoundFeature {
          price
        }
        priceHigherBoundFeature {
          price
        }
        manufacturerFeature {
          manufacturer {
            name
          }
        }
        modelFeature {
          model {
            name
          }
        }
        categoryFeature {
          category {
            name
          }
        }
        mileageLowerBoundFeature {
          mileage
        }
        mileageHigherBoundFeature {
          mileage
        }
        yearLowerBoundFeature {
          year
        }
        yearHigherBoundFeature {
          year
        }
        features {
          feature {
            name
            category {
              name
            }
          }
        }
        isUrgent
        isFirst
        status
      }
    }
  }
`;
