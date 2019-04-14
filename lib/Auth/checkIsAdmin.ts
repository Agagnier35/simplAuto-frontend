import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { LOGGED_IN_QUERY } from '../../components/General/Header/index';
import { Permission } from '../../generated/graphql';

export default async (apolloClient: ApolloClient<any>) => {
  try {
    const { data }: any = await apolloClient.query({
      query: LOGGED_IN_QUERY,
      fetchPolicy: 'network-only',
    });
    return data.me.permissions.includes(Permission.User);
  } catch (e) {
    return null;
  }
};
