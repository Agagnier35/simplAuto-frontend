import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';

export default (apolloClient: ApolloClient<any>) =>
  apolloClient
    .query({
      query: gql`
        query IS_LOGGED_IN {
          me {
            id
          }
        }
      `,
    })
    .then(({ data }) => {
      return { user: data };
    })
    .catch(() => {
      return { user: null };
    });
