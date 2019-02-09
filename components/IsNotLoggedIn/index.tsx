import * as React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Query } from 'react-apollo';
import Loading from '../Loading';

const IsNotLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const LOGGED_IN_QUERY = gql`
    {
      me {
        id
      }
    }
  `;
  return (
    <Query query={LOGGED_IN_QUERY}>
      {({ error, loading }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
            console.log('NOT LOGGED IN');
            return children;
        } else {
            // Router.push('/');
            return null;
        }
      }}
    </Query>
  );
};

export default IsNotLoggedIn;
