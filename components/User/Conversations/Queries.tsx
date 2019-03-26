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
          price
          car {
            photos
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
