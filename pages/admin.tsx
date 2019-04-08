import React from 'react';
import redirect from '../lib/Auth/Redirect';
import checkIsAdmin from '../lib/Auth/checkIsAdmin';
import Admin from '../components/Admin/Admin';
import { withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';

interface AdminPageProps {
  client: ApolloClient<any>;
}

class AdminPage extends React.Component<AdminPageProps> {
  static async getInitialProps(ctx: any) {
    const isAdmin = await checkIsAdmin(ctx.apolloClient);

    if (!isAdmin) {
      redirect(ctx, '/login');
    }

    return { isAdmin };
  }

  render() {
    return <Admin client={this.props.client} />;
  }
}

export default withApollo(AdminPage);
