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
    <div>
      <Query query={LOGGED_IN_QUERY}>
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (data.me && data.me.id) {
            return children;
          }
          if (data.me && data.me === null) {
            Router.push('/');
            return null;
          }
          return null;
        }}
      </Query>
    </div>
  );
};

export default IsLoggedIn;
