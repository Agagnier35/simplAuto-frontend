import React from 'react';
import ProfilePage from '../components/Profile';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class LoginPage extends PrivateComponent {
  render() {
    return (
      <div>
        <ProfilePage />
      </div>
    );
  }
}

export default LoginPage;
