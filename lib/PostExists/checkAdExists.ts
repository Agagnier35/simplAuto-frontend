import { ApolloClient } from 'apollo-client';
import { AD_DETAIL_QUERY } from '../../components/Ad/AdDetail/Queries';

export default (apolloClient: ApolloClient<any>, id: string) =>
  apolloClient
    .query({
      query: AD_DETAIL_QUERY,
      variables: { id },
    })
    .then(({ data }) => {
      return data.ad;
    })
    .catch(() => {
      return null;
    });
