import * as React from 'react';
// import gql from 'graphql-tag';
// import Router from 'next/router';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import { LOGGED_IN_QUERY } from '../IsLoggedIn';

const IsNotLoggedIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Query query={LOGGED_IN_QUERY}>
      {({ error, loading }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
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
