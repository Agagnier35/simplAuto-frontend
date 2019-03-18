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

export const UPDATE_CONVERSATION_MUTATION = gql`
  mutation UPDATE_CONVERSATION_MUTATION($data: ConversationUpdateInput) {
    updateConversation(data: $data) {
      id
      status
    }
  }
`;
