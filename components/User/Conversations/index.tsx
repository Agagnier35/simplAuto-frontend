import React, { Component } from 'react';
import { multiUpdater } from '../../../lib/MultiLang';
import { Query } from 'react-apollo';
import { GET_USER_CONVERSATIONS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';

class Conversations extends Component {
  state = {};

  render = () => {
    return (
      <Query query={GET_USER_CONVERSATIONS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          console.log(data);
          return <div>Halo</div>;
        }}
      </Query>
    );
  };
}

export default multiUpdater(Conversations);
