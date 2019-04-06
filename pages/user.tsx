import React from 'react';
import redirect from '../lib/Auth/Redirect';
import checkIsAdmin from '../lib/Auth/checkIsAdmin';
import UserDetail from '../components/User/UserDetail';
import { User } from '../generated/graphql';
import { USER_QUERY } from '../components/User/UserDetail/Queries';

interface UserPageProps {
  user: User;
}

class UserPage extends React.Component<UserPageProps> {
  static async getInitialProps(ctx: any) {
    const isAdmin = await checkIsAdmin(ctx.apolloClient);

    if (!isAdmin) {
      redirect(ctx, '/login');
    }

    try {
      const { data }: { data: { user: User } } = await ctx.apolloClient.query({
        query: USER_QUERY,
        variables: { id: ctx.query.id },
      });

      return { user: data.user };
    } catch (error) {
      // error occured
      redirect(ctx, '/admin');
      return {};
    }
  }

  render() {
    const { user } = this.props;
    return <UserDetail user={user} />;
  }
}

export default UserPage;
