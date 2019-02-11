import React from 'react';
import { multi } from '../lib/MultiLang';
import ProfilePage from '../components/Profile/profilePage';


const Profile = () => {
  return (
    <div>
      <ProfilePage />
    </div>
    
  );
};

export default multi(Profile);
