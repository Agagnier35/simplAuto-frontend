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
              updatedAt
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
          }
        }
        messages {
          id
          updatedAt
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
