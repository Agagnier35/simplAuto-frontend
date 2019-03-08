import React, { useState, FormEvent, useEffect } from 'react';
import { Offer, Message, Maybe } from '../../../generated/graphql';
import * as Chat from './styles';
import { InputGroup, Form } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { useMutation, useSubscription } from 'react-apollo-hooks';
import { SEND_MESSAGE_MUTATION } from './Mutations';
import { OFFER_BY_ID } from '../../Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from './Subscriptions';
import { multi, MultiProps } from '../../../lib/MultiLang';

interface ChatSectionProps extends MultiProps {
  offer: Offer;
}

const ChatSection = ({ offer, translations }: ChatSectionProps) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const handleSendMessage = useMutation(SEND_MESSAGE_MUTATION, {
    variables: {
      data: {
        conversationID: offer.conversation && offer.conversation.id,
        text: currentMessage,
        image: currentImage,
      },
    },
    update: handleUpdateMessageCache,
  });
  let upload: Maybe<HTMLInputElement>;

  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      conversationID: offer.conversation && offer.conversation.id,
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(client);
      console.log(subscriptionData);
      // Optional callback which provides you access to the new subscription
      // data and the Apollo client. You can use methods of the client to update
      // the Apollo cache:
      // https://www.apollographql.com/docs/react/advanced/caching.html#direct
    },
  });

  function handleChange(e: FormEvent<any>) {
    setCurrentMessage(e.currentTarget.value);
  }

  async function sendMessage(e: FormEvent<HTMLFormElement> | any) {
    e.preventDefault();
    if (currentMessage.length > 0 || currentImage !== '') {
      await handleSendMessage();
      setCurrentMessage('');
      setCurrentImage('');
    }
  }

  async function getURLsFromCloud(file: any) {
    const data = new FormData();
    data.append('file', file as any);
    data.append('upload_preset', 'Car Image');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/simplauto/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const photoURL = await res.json();
    setCurrentImage(photoURL.secure_url);
  }

  function handlePictureChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      getURLsFromCloud(file);
    } else {
      setCurrentImage('');
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
  }, [offer]);

  return (
    <Chat.Card>
      <h2>{translations.Chat.title}</h2>
      {offer.conversation && (
        <>
          <Chat.Container className="chat">
            {offer.conversation.messages.map((message: Message) => (
              <Chat.Message sender={message.sender}>
                {message.image && message.image !== '' && (
                  <img className="chatImage" src={message.image} />
                )}
                {message.text && message.text !== '' && <p>{message.text}</p>}
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
                placeholder={translations.Chat.sendPlaceholder}
              />
              <img className="imagePreview" src={currentImage} />
              <InputGroup.Append>
                <InputGroup.Text className="image-button">
                  <input
                    id="upload"
                    type="file"
                    ref={ref => (upload = ref)}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handlePictureChange}
                  />
                  <FaImage
                    onClick={() => {
                      if (upload) upload.click();
                    }}
                  />
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Append>
                <InputGroup.Text className="send-button" onClick={sendMessage}>
                  {translations.Chat.send}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </>
      )}
    </Chat.Card>
  );
};

export default multi(ChatSection);
