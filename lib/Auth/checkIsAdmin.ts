import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { LOGGED_IN_QUERY } from '../../components/General/Header/index';
import { Permission } from '../../generated/graphql';

export default (apolloClient: ApolloClient<any>) =>
  apolloClient
    .query({
      query: LOGGED_IN_QUERY,
    })
    .then(({ data }) => {
      return data.me.permissions.includes(Permission.User);
    })
    .catch(() => {
      return null;
    });
