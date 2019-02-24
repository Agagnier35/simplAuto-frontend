import gql from 'graphql-tag';

export const OFFER_BY_ID = gql`
  query OFFER_BY_ID($id: ID!) {
    offer(id: $id) {
      id
      price
      car {
        id
        manufacturer {
          name
        }
        model {
          name
        }
        category {
          name
        }
        year
        mileage
        photos
        features {
          name
          category {
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
