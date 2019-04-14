import React, { useState, FormEvent, useEffect } from 'react';
import {
  Message,
  ConversationStatus,
  Conversation,
  Offer,
  User,
} from '../../../generated/graphql';

import { InputGroup, Form, Button } from 'react-bootstrap';
import { useMutation, useSubscription, useQuery } from 'react-apollo-hooks';
import {
  SEND_MESSAGE_MUTATION,
  UPDATE_CONVERSATION_MUTATION,
} from '../Chat/Mutations';

import { OFFER_BY_ID } from '../../Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from '../Chat/Subscriptions';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { LOGGED_IN_QUERY } from '../../General/Header';
import moment from 'moment';
import { FaImage, FaArrowLeft } from 'react-icons/fa';
import {
  DaySpacer,
  Card,
  Container,
  MessageStyle,
  Time,
  ChatTitle,
} from './style';
import { GET_USER_CONVERSATIONS_QUERY } from '../Conversations/Queries';
import { More } from '../../Ad/AdSummary/styles';

interface ChatSectionProps extends MultiProps {
  offer: Offer;
  handleSelectConversation: (offer: any) => void;
}

const ChatWindow = ({
  offer,
  translations,
  handleSelectConversation,
}: ChatSectionProps) => {
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
        query: GET_USER_CONVERSATIONS_QUERY,
      };
      const message: Message = subscriptionData.data.messageSubscription;
      message.sender;
      const data = client.cache.readQuery(offerQuery) as any; // sketch

      if (data) {
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

  function getUserName(user: User) {
    if (user.companyName !== '') {
      return user.companyName;
    } else {
      return user.firstName + ' ' + user.lastName;
    }
  }

  function getSellerName(convo: Conversation) {
    return getUserName(convo.seller);
  }

  function getBuyerName(convo: Conversation) {
    return getUserName(convo.buyer);
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
          <DaySpacer>
            <hr />
            <span>{moment(currentMessage.updatedAt).format('L')}</span>
            <hr />
          </DaySpacer>
        );
      }
    }
  }
  return (
    <Card currentOffer={offer}>
      {offer.conversation &&
        offer.conversation.status !== ConversationStatus.Deleted && (
          <>
            <ChatTitle>
              <More
                size="sm"
                variant="light"
                id="dropdown-basic"
                onClick={() => handleSelectConversation(null)}
              >
                <FaArrowLeft />
              </More>
              <h2>
                {isMyOffer
                  ? getBuyerName(offer.conversation)
                  : getSellerName(offer.conversation)}
              </h2>
            </ChatTitle>
            <Container className="chat">
              {offer.conversation.messages.map(
                (message: Message, index: number) => (
                  <React.Fragment key={message.id}>
                    {getDaySpacer(offer.conversation, index)}
                    <MessageStyle isSelfOrSeller={isSelfOrSeller(message)}>
                      {isSelfOrSeller(message) && (
                        <Time>{moment(message.updatedAt).format('LT')}</Time>
                      )}
                      {message.image && message.image !== '' && (
                        <img className="chatImage" src={message.image} />
                      )}
                      {message.text && message.text !== '' && (
                        <p>{message.text}</p>
                      )}
                      {!isSelfOrSeller(message) && (
                        <Time>{moment(message.updatedAt).format('LT')}</Time>
                      )}
                    </MessageStyle>
                  </React.Fragment>
                ),
              )}
            </Container>
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
    </Card>
  );
};

export default multi(ChatWindow);
