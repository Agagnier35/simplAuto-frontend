import React, { useState, FormEvent, useEffect } from 'react';
import {
  Offer,
  Message,
  Maybe,
  Conversation,
} from '../../../generated/graphql';
import * as Chat from './styles';
import { InputGroup, Form } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { useMutation, useSubscription, useQuery } from 'react-apollo-hooks';
import { SEND_MESSAGE_MUTATION } from './Mutations';
import { OFFER_BY_ID } from '../../Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from './Subscriptions';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { LOGGED_IN_QUERY } from '../../General/Header';
import moment from 'moment';

interface ChatSectionProps extends MultiProps {
  offer: Offer;
}

const ChatSection = ({ offer, translations }: ChatSectionProps) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [refreshCount, forceRefresh] = useState(0);
  const [currentImage, setCurrentImage] = useState('');

  const meQuery = useQuery(LOGGED_IN_QUERY);
  const isMyOffer = offer.creator && meQuery.data.me.id === offer.creator.id;
  const isMyAd = offer.ad.creator && meQuery.data.me.id === offer.ad.creator.id;

  const handleSendMessage = useMutation(SEND_MESSAGE_MUTATION, {
    variables: {
      data: {
        conversationID: offer.conversation && offer.conversation.id,
        text: currentMessage,
        image: currentImage,
      },
    },
  });
  let upload: Maybe<HTMLInputElement>;

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      conversationID: offer.conversation && offer.conversation.id,
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const offerQuery = {
        query: OFFER_BY_ID,
        variables: { id: offer.id },
      };
      const message: Message = subscriptionData.data.messageSubscription;
      message.sender;
      const data = client.cache.readQuery(offerQuery) as any; // sketch

      if (data) {
        data.offer.conversation.messages.push(message);
      }

      client.cache.writeQuery({ ...offerQuery, data });
      forceRefresh(refreshCount + 1);
    },
  });

  function handleChange(e: FormEvent<any>) {
    setCurrentMessage(e.currentTarget.value);
  }

  async function sendMessage(e: FormEvent<HTMLFormElement> | any) {
    e.preventDefault();
    if (currentMessage.length > 0 || currentImage !== '') {
      setCurrentMessage('');
      setCurrentImage('');
      await handleSendMessage();
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
  }, [offer.conversation && offer.conversation.messages.length]);

  function isSelfOrSeller(message: Message) {
    const conversation = offer.conversation as Conversation;
    const senderIsSelf = message.sender.id === meQuery.data.me.id;
    const selfNotBuyerOrSeller = !isMyOffer && !isMyAd;
    const senderIsSeller = message.sender.id === conversation.seller.id;

    return senderIsSelf || (selfNotBuyerOrSeller && senderIsSeller);
  }

  function getDaySpacer(
    conversation: Conversation | null | undefined,
    index: number,
  ) {
    const convo = conversation as Conversation;
    const messages = convo.messages;
    const isFirstMessage = index === 0;

    if (!isFirstMessage) {
      const previousMessage = messages[index - 1];
      const currentMessage = messages[index];
      const isSameDay =
        moment(currentMessage.updatedAt).format('L') ===
        moment(previousMessage.updatedAt).format('L');
      if (!isSameDay) {
        return (
          <Chat.DaySpacer>
            <hr />
            <span>{moment(currentMessage.updatedAt).format('L')}</span>
            <hr />
          </Chat.DaySpacer>
        );
      }
    }
  }

  return (
    <Chat.Card>
      <h2>{translations.Chat.title}</h2>
      {offer.conversation && (
        <>
          <Chat.Container className="chat">
            {offer.conversation.messages.map(
              (message: Message, index: number) => (
                <React.Fragment key={message.id}>
                  {getDaySpacer(offer.conversation, index)}
                  <Chat.Message isSelfOrSeller={isSelfOrSeller(message)}>
                    {isSelfOrSeller(message) && (
                      <Chat.Time>
                        {moment(message.updatedAt).format('LT')}
                      </Chat.Time>
                    )}
                    {message.image && message.image !== '' && (
                      <img className="chatImage" src={message.image} />
                    )}
                    {message.text && message.text !== '' && (
                      <p>{message.text}</p>
                    )}
                    {!isSelfOrSeller(message) && (
                      <Chat.Time>
                        {moment(message.updatedAt).format('LT')}
                      </Chat.Time>
                    )}
                  </Chat.Message>
                </React.Fragment>
              ),
            )}
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
