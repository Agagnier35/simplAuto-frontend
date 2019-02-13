import * as React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Query } from 'react-apollo';
import Loading from '../Loading';

export const LOGGED_IN_QUERY = gql`
    {
      me {
        id
      }
    }
  `;

const IsLoggedIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Query query={LOGGED_IN_QUERY}>
      {({ error, loading }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          Router.push('/');
          return null;
        } else {
          return children;
        }
      }}
    </Query>
  );
};

export default IsLoggedIn;
