import React, { useState, FormEvent, useEffect } from 'react';
import {
  Offer,
  Message,
  ConversationStatus,
  Conversation,
} from '../../../generated/graphql';

import * as Chat from './styles';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useMutation, useSubscription, useQuery } from 'react-apollo-hooks';
import {
  SEND_MESSAGE_MUTATION,
  UPDATE_CONVERSATION_MUTATION,
} from './Mutations';

import { OFFER_BY_ID } from '../../Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from './Subscriptions';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { LOGGED_IN_QUERY } from '../../General/Header';
import moment from 'moment';
import { FaEyeSlash as HideIcon, FaImage } from 'react-icons/fa';

interface ChatSectionProps extends MultiProps {
  offer: Offer;
}

const ChatSection = ({ offer, translations }: ChatSectionProps) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [refreshCount, forceRefresh] = useState(0);
  const [currentImage, setCurrentImage] = useState('');

  const meQuery = useQuery(LOGGED_IN_QUERY);
  const isMyOffer = offer.creator && meQuery.data.me.id === offer.creator.id;
  const isMyAd = !isMyOffer;

  const handleSendMessage = useMutation(SEND_MESSAGE_MUTATION);
  const handleUpdateConversation = useMutation(UPDATE_CONVERSATION_MUTATION);
  let upload: HTMLInputElement | null;

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
        if (offerQuery.variables) {
          // We're in an offer
          data.offer.conversation.messages.push(message);
        } else {
          // Theres no variables -> inside conversations
          data.me.conversations = data.me.conversations.map(
            (conversation: Conversation) => {
              if (conversation.offer.id === offer.id) {
                conversation.messages.push(message);
              }
              return conversation;
            },
          );
        }
      }

      client.cache.writeQuery({ ...offerQuery, data });
      forceRefresh(refreshCount + 1);
    },
  });

  function handleChange(e: FormEvent<any>) {
    setCurrentMessage(e.currentTarget.value);
  }

  async function sendMessage(
    e: React.FormEvent<any>,
    text: string,
    image: string,
  ) {
    if (currentMessage.length > 0 || currentImage !== '') {
      e.preventDefault();
      setCurrentMessage('');
      setCurrentImage('');
      await handleSendMessage({
        variables: {
          data: {
            text,
            image,
            conversationID: offer.conversation && offer.conversation.id,
          },
        },
      });
    }
  }

  async function toggleConversationStatus(
    e: FormEvent<HTMLFormElement> | any,
    chatStatus: ConversationStatus,
  ) {
    e.preventDefault();
    let status = ConversationStatus.Opened;
    if (status === chatStatus) {
      status = ConversationStatus.Deleted;
    }

    await handleUpdateConversation({
      variables: {
        data: {
          status,
          id: offer.conversation && offer.conversation.id,
        },
        refetchQueries: { OFFER_BY_ID },
      },
    });
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
      {offer.conversation &&
        offer.conversation.status !== ConversationStatus.Deleted && (
          <>
            <h2>{translations.Chat.title}</h2>
            <Chat.Container className="chat">
              {offer.conversation.messages.map(
                (message: Message, index: number) => (
                  <React.Fragment key={message.id}>
                    {getDaySpacer(offer.conversation, index)}
                    <Chat.MessageStyle isSelfOrSeller={isSelfOrSeller(message)}>
                      {isSelfOrSeller(message) && (
                        <Chat.Time>
                          {moment(message.updatedAt).format('LT')}
                        </Chat.Time>
                      )}
                      <div>
                        {message.image && message.image !== '' && (
                          <img className="chatImage" src={message.image} />
                        )}
                        {message.text && message.text !== '' && (
                          <p>{message.text}</p>
                        )}
                      </div>
                      {!isSelfOrSeller(message) && (
                        <Chat.Time>
                          {moment(message.updatedAt).format('LT')}
                        </Chat.Time>
                      )}
                    </Chat.MessageStyle>
                  </React.Fragment>
                ),
              )}
            </Chat.Container>
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                sendMessage(e, currentMessage, currentImage)
              }
            >
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
                  <InputGroup.Text
                    className="send-button"
                    onClick={(
                      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
                    ) => sendMessage(e, currentMessage, currentImage)}
                  >
                    {translations.Chat.send}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </>
        )}
      {offer.conversation && (
        <Button
          variant="warning"
          onClick={(e: any) => {
            if (offer.conversation && offer.conversation.status) {
              toggleConversationStatus(e, offer.conversation.status);
            }
          }}
        >
          <HideIcon />
          {translations.Chat.hideChat}
        </Button>
      )}
    </Chat.Card>
  );
};

export default multi(ChatSection);
