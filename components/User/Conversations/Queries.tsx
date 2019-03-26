import gql from 'graphql-tag';

export const GET_USER_CONVERSATIONS_QUERY = gql`
  query {
    me {
      id
      conversations {
        id
        buyer {
          id
          firstName
          lastName
        }
        seller {
          id
          firstName
          lastName
        }
        offer {
          id
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
          price
          car {
            photos
            manufacturer {
              name
            }
            model {
              name
            }
            year
          }
        }
        messages {
          id
          sender {
            id
            firstName
            lastName
          }
          text
          image
        }
      }
    }
  }
`;
