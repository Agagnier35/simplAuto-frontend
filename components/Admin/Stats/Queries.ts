import gql from 'graphql-tag';

export const ADMIN_STATS = gql`
  query ADMIN_STATS {
    adminStats {
      top10MostSoldMakeModel {
        model {
          id
          name
        }
        make {
          id
          name
        }
        count
        averageTime
        averagePrice
      }
      top10FastestSold {
        model {
          id
          name
        }
        make {
          id
          name
        }
        count
        averageTime
        averagePrice
      }
      bestSeller {
        id
        firstName
        lastName
        clientType
        companyName
      }
      bestSellerTop10Cars {
        model {
          id
          name
        }
        make {
          id
          name
        }
        count
        averageTime
        averagePrice
      }
      allVehiculesCount
      allAdsCount
      activeUsersCount
      inactiveUsersCount
    }
  }
`;

export const ADMIN_RESEARCH = gql`
  query ADMIN_RESEARCH($data: AdminCarResarchInput!) {
    adminStatisticsCar(data: $data) {
      averagePriceAPI
      averageTimeOnMarketAPI
      lowestPriceSoldAPI
      highestPriceSoldAPI
      lowestTimeOnMarketAPI
      highestTimeOnMarketAPI

      soldOnApp
      averagePriceApp
      averageTimeOnMarketApp
      lowestPriceSoldApp
      highestPriceSoldApp
      lowestTimeOnMarketApp
      highestTimeOnMarketApp
    }
  }
`;

export const MANUFACTURERS = gql`
  query MANUFACTURERS {
    manufacturers {
      id
      name
      models {
        id
        name
      }
    }
  }
`;
