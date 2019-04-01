import { ApolloClient } from 'apollo-client';
import { IS_LOGGED_IN } from './Queries';

export default (apolloClient: ApolloClient<any>) =>
  apolloClient
    .query({
      query: IS_LOGGED_IN,
    })
    .then(({ data }) => {
      return { user: data };
    })
    .catch(() => {
      return { user: null };
    });
