import React, { useState, FormEvent, useEffect } from 'react';
import {
  Message,
  ConversationStatus,
  Conversation,
} from '../../../generated/graphql';

import { InputGroup, Form } from 'react-bootstrap';
import { useMutation, useSubscription, useQuery } from 'react-apollo-hooks';
import {
  SEND_MESSAGE_MUTATION,
  UPDATE_CONVERSATION_MUTATION,
} from '../../Chat/Chat/Mutations';

import { OFFER_BY_ID } from '../../Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from '../../Chat/Chat/Subscriptions';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { LOGGED_IN_QUERY } from '../../General/Header';
import moment from 'moment';
import { FaImage } from 'react-icons/fa';
import { DaySpacer, Card, Container, MessageStyle, Time } from './style';

interface ChatSectionProps extends MultiProps {
  convo: Conversation;
}

const ChatSection = ({ convo, translations }: ChatSectionProps) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [refreshCount, forceRefresh] = useState(0);
  const [currentImage, setCurrentImage] = useState('');

  const meQuery = useQuery(LOGGED_IN_QUERY);
  const isMyOffer = convo && meQuery.data.me.id === convo.seller.id;
  const isMyAd = !isMyOffer;

  const handleSendMessage = useMutation(SEND_MESSAGE_MUTATION);
  const handleUpdateConversation = useMutation(UPDATE_CONVERSATION_MUTATION);
  let upload: HTMLInputElement | null;

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      conversationID: convo && convo.id,
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const offerQuery = {
        query: OFFER_BY_ID,
        variables: { id: convo.offer.id },
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
              if (conversation.offer.id === convo.offer.id) {
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

  async function sendMessage(text: string, image: string) {
    if (currentMessage.length > 0 || currentImage !== '') {
      setCurrentMessage('');
      setCurrentImage('');
      await handleSendMessage({
        variables: {
          data: {
            text,
            image,
            conversationID: convo && convo.id,
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
          id: convo && convo.id,
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

  function scrollToBottom() {
    const chatBottomElement = document.querySelector('.chat');
    if (chatBottomElement) {
      chatBottomElement.scrollTop = chatBottomElement.scrollHeight;
    }
  }

  function getSellerName() {
    return convo.seller.firstName + ' ' + convo.seller.lastName;
  }

  function getBuyerName() {
    return convo.buyer.firstName + ' ' + convo.buyer.lastName;
  }

  useEffect(() => {
    scrollToBottom();
  }, [convo && convo.messages.length]);

  function isSelfOrSeller(message: Message) {
    const conversation = convo as Conversation;
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
    <Card>
      {convo && convo.status !== ConversationStatus.Deleted && (
        <>
          <h2>{isMyOffer ? getBuyerName() : getSellerName()}</h2>
          <Container className="chat">
            {convo.messages.map((message: Message, index: number) => (
              <React.Fragment key={message.id}>
                {getDaySpacer(convo, index)}
                <MessageStyle isSelfOrSeller={isSelfOrSeller(message)}>
                  {isSelfOrSeller(message) && (
                    <Time>{moment(message.updatedAt).format('LT')}</Time>
                  )}
                  {message.image && message.image !== '' && (
                    <img className="chatImage" src={message.image} />
                  )}
                  {message.text && message.text !== '' && <p>{message.text}</p>}
                  {!isSelfOrSeller(message) && (
                    <Time>{moment(message.updatedAt).format('LT')}</Time>
                  )}
                </MessageStyle>
              </React.Fragment>
            ))}
          </Container>
          <Form onSubmit={() => sendMessage(currentMessage, currentImage)}>
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
                  onClick={() => sendMessage(currentMessage, currentImage)}
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

export default multi(ChatSection);
