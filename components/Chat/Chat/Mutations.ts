import gql from 'graphql-tag';

export const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($data: SendMessageInput) {
    sendMessage(data: $data) {
      sender {
        id
      }
      text
      image
    }
  }
`;
