// Ceci est le component qui contiendra le chat? -> Vérifier avec les gars
// Ceci sera affiché lorsque l'utilisateur cliquera sur une converation dans la conversationsList
import React, { Component } from 'react';
import { multiUpdater } from '../../../../lib/MultiLang';

class Conversations extends Component {
  state = {};

  render = () => {
    return <div>The actual conversation</div>;
  };
}

export default multiUpdater(Conversations);
