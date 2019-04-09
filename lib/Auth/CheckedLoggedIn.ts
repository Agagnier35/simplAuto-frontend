import { ApolloClient } from 'apollo-client';
import { IS_LOGGED_IN } from './Queries';
import { LOGGED_IN_QUERY } from '../../components/General/Header';

export default (apolloClient: ApolloClient<any>) =>
  apolloClient
    .query({
      query: LOGGED_IN_QUERY,
    })
    .then(({ data }) => {
      return { user: data };
    })
    .catch(e => {
      console.log('ERROR: ---------------');
      console.log(e.networkError);
      console.log('Response:---------------------');
      console.log(e.networkError.response);
      console.log('Header:----------------------');
      console.log(e.networkError.response.header);
      return { user: null };
    });
