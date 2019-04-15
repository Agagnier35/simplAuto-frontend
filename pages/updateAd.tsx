import React from 'react';
import UpdateAd from '../components/Ad/UpdateAd';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import checkAdExists from '../lib/PostExists/checkAdExists';
import redirect from '../lib/Auth/Redirect';

class UpdateAdPage extends PrivateComponent {
  static async getInitialProps(ctx: any) {
    const { user } = await PrivateComponent.getInitialProps(ctx);
    const ad = await checkAdExists(ctx.apolloClient, ctx.query.id);

    if (!ad || !ad.creator || ad.creator.id !== user.me.id) {
      redirect(ctx, '/login');
    }
    return { ad, user };
  }
  render() {
    return (
      <div>
        <UpdateAd {...this.props} />
      </div>
    );
  }
}

export default UpdateAdPage;
