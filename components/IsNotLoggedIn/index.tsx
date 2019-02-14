import * as React from 'react';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import { LOGGED_IN_QUERY } from '../IsLoggedIn';
import Router from 'next/router';

const IsNotLoggedIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Query query={LOGGED_IN_QUERY}>
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (data && data.me === null) {
            return children;
          }

          Router.push('/'); // Redirect to Home if loggedIn
          return null;
        }}
      </Query>
    </div>
  );
};

export default IsNotLoggedIn;
