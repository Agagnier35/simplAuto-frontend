import gql from 'graphql-tag';

export const OFFER_BY_ID = gql`
  query OFFER_BY_ID($id: ID!) {
    offer(id: $id) {
      id
      price
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
      addons {
        id
        name
      }
      conversation {
        id
        buyer {
          id
        }
        seller {
          id
        }
        messages {
          id
          sender {
            id
          }
          text
          image
        }
      }
    }
  }
`;

export const OFFER_STATS_QUERY = gql`
  query OFFER_STATS_QUERY($id: ID!) {
    statsForOffer(id: $id) {
      averagePriceAPI
      averageTimeOnMarketAPI
      averagePriceApp
      averageTimeOnMarketApp
    }
  }
`;
