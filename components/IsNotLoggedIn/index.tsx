import * as React from 'react';
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
            return (<div><h2>You are not logged in...</h2></div>);
        }
      }}
    </Query>
  );
};

export default IsNotLoggedIn;
