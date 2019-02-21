import gql from 'graphql-tag';

export const ALL_ADS_QUERY = gql`
  {
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
`;
