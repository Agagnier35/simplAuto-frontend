import Login from '../components/Login';

import React, { Component } from 'react';
import checkLoggedIn from '../lib/Auth/CheckedLoggedIn';
import redirect from '../lib/Auth/Redirect';

class LoginPage extends Component {
  static async getInitialProps(ctx: any) {
    const { user }: any = await checkLoggedIn(ctx.apolloClient);

    if (user && user.me) {
      // Already Logged in
      redirect(ctx, '/'); // -> Home
    }

    return { user };
  }
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default LoginPage;
