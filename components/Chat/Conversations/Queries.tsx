import gql from 'graphql-tag';

export const GET_USER_CONVERSATIONS_QUERY = gql`
  query GET_USER_CONVERSATIONS_QUERY {
    me {
      id
      conversationCount
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
          creator {
            createdAt
            id
            firstName
            lastName
            clientType
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
