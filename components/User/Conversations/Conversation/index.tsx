// Ceci est le component qui contiendra le chat? -> Vérifier avec les gars
// Ceci sera affiché lorsque l'utilisateur cliquera sur une converation dans la conversationsList
// Ceci sera seulement le chat en fait.
import React, { Component, useEffect } from 'react';
import { multiUpdater } from '../../../../lib/MultiLang';
import Chat from '../../../Chat/Chat';
import { Offer } from '../../../../generated/graphql';

interface ConversationProps {
  subscribeToNewComments: () => void;
  offer: Offer;
  loading: boolean;
  offerQuery: any;
}

const Conversation = ({
  subscribeToNewComments,
  offer,
  loading,
  offerQuery,
}: ConversationProps) => {
  useEffect(() => {
    subscribeToNewComments();
  }, [loading]);

  return <Chat offer={offer} offerQuery={offerQuery} />;
};

export default multiUpdater(Conversation);
