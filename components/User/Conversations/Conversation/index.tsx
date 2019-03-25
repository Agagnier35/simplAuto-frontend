// Ceci est le component qui contiendra le chat? -> Vérifier avec les gars
// Ceci sera affiché lorsque l'utilisateur cliquera sur une converation dans la conversationsList
// Ceci sera seulement le chat en fait.
import React, { Component } from 'react';
import { multiUpdater } from '../../../../lib/MultiLang';
import Chat from '../../../Chat/Chat';

class Conversations extends Component {
  state = {};

  render = () => {
    const { offer }: any = this.props;
    return <Chat offer={offer} />;
  };
}

export default multiUpdater(Conversations);
