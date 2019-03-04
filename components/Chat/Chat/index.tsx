import React, { useState, FormEvent, useEffect } from 'react';
import { Offer, Message } from '../../../generated/graphql';
import * as Chat from './styles';
import { InputGroup, Form } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { useMutation, useSubscription } from 'react-apollo-hooks';
import { SEND_MESSAGE_MUTATION } from './Mutations';
import { OFFER_BY_ID } from '../../Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from './Subscriptions';

interface ChatSectionProps {
  offer: Offer;
}

const ChatSection: React.FunctionComponent<ChatSectionProps> = ({ offer }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const handleSendMessage = useMutation(SEND_MESSAGE_MUTATION, {
    variables: {
      data: {
        conversationID: offer.conversation && offer.conversation.id,
        text: currentMessage,
      },
    },
    update: handleUpdateMessageCache,
  });

  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      conversationID: offer.conversation && offer.conversation.id,
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const offerQuery = {
        query: OFFER_BY_ID,
        variables: { id: offer.id },
      };
      const message = subscriptionData.data.messageSubscription;
      const data = client.cache.readQuery(offerQuery) as any; // sketch

      if (data) {
        data.offer.conversation.messages.push(message);
      }

      client.cache.writeQuery({ ...offerQuery, data });
    },
  });

  function handleChange(e: FormEvent<any>) {
    setCurrentMessage(e.currentTarget.value);
  }

  async function sendMessage(e: FormEvent<HTMLFormElement> | any) {
    e.preventDefault();
    if (currentMessage.length > 0) {
      await handleSendMessage();
      setCurrentMessage('');
    }
  }

  function handleUpdateMessageCache(cache: any, payload: any) {
    const offerQuery = {
      query: OFFER_BY_ID,
      variables: { id: offer.id },
    };
    const data = cache.readQuery(offerQuery);
    const message = payload.data.sendMessage;

    data.offer.conversation.messages.push(message);

    cache.writeQuery({ ...offerQuery, data });
  }

  function scrollToBottom() {
    const chatBottomElement = document.querySelector('.chat');
    if (chatBottomElement) {
      chatBottomElement.scrollTop = chatBottomElement.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [offer.conversation && offer.conversation.messages.length]);

  return (
    <Chat.Card>
      <h2>Chat</h2>
      {data && data.messageSubscription.text}
      {console.log(data)}
      {offer.conversation && (
        <>
          <Chat.Container className="chat">
            {offer.conversation.messages.map((message: Message) => (
              <Chat.Message sender={message.sender}>
                <p>{message.text}</p>
              </Chat.Message>
            ))}
          </Chat.Container>
          <Form onSubmit={sendMessage}>
            <InputGroup>
              <Form.Control
                aria-describedby="inputGroupAppend"
                required
                type="text"
                value={currentMessage}
                onChange={handleChange}
                placeholder="Envoyez un message"
              />
              <InputGroup.Append>
                <InputGroup.Text className="image-button">
                  <FaImage />
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Append>
                <InputGroup.Text className="send-button" onClick={sendMessage}>
                  Send
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </>
      )}
    </Chat.Card>
  );
};

export default ChatSection;
