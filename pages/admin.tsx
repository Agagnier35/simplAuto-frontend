import React from 'react';
import redirect from '../lib/Auth/Redirect';
import checkIsAdmin from '../lib/Auth/checkIsAdmin';
import AdminPage from '../components/Admin/Admin';

class OfferPage extends React.Component {
  static async getInitialProps(ctx: any) {
    const isAdmin = await checkIsAdmin(ctx.apolloClient);

    if (!isAdmin) {
      redirect(ctx, '/login');
    }

    return { isAdmin };
  }

  render() {
    return <AdminPage />;
  }
}

export default OfferPage;
