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
          console.log(data);
          if (loading) {
            return <Loading />;
          }
          if (data && data.me && data.me.id) {
            Router.push('/'); // Redirect to Home if loggedIn
            return null;
          }
          return children;
        }}
      </Query>
    </div>
  );
};

export default IsNotLoggedIn;
