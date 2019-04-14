import { ApolloClient } from 'apollo-client';
import { IS_LOGGED_IN } from './Queries';
import { LOGGED_IN_QUERY } from '../../components/General/Header';

export default async (apolloClient: ApolloClient<any>) => {
  try {
    const { data }: any = await apolloClient.query({
      query: IS_LOGGED_IN,
      fetchPolicy: 'network-only',
    });
    return { user: data };
  } catch (e) {
    return { user: null };
  }
};
