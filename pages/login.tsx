import React from 'react';
import Login from '../components/Auth/Login';
import PublicComponent from '../lib/Auth/PublicComponent';

class LoginPage extends PublicComponent {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default LoginPage;
