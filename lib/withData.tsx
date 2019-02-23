import withApollo, { InitApolloOptions } from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';

export function createClient({ headers }: InitApolloOptions<{}>) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: async operation => {
      await operation.setContext({
        headers,
        fetchOptions: {
          credentials: 'include',
        },
      });
    },
  });
}

export default withApollo(createClient);
