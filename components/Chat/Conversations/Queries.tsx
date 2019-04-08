import gql from 'graphql-tag';

export const GET_USER_CONVERSATIONS_QUERY = gql`
  query GET_USER_CONVERSATIONS_QUERY {
    me {
      id
      conversationCount
      conversations {
        id
        status
        buyer {
          id
          companyName
          firstName
          lastName
        }
        seller {
          id
          companyName
          firstName
          lastName
        }
        offer {
          id
          conversation {
            id
            status
            buyer {
              id
              companyName
              firstName
              lastName
            }
            seller {
              id
              companyName
              firstName
              lastName
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
          creator {
            createdAt
            id
            firstName
            lastName
            clientType
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
