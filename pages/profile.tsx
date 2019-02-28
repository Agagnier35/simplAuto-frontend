import React from 'react';
import Profile from '../components/User/Profile';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class ProfilePage extends PrivateComponent {
  render() {
    return (
      <div>
        <Profile />
      </div>
    );
  }
}

export default ProfilePage;
