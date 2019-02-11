import React from 'react';
import { multi } from '../lib/MultiLang';
import ProfilePage from '../components/Profile/profilePage';
import IsLoggedIn from '../components/IsLoggedIn';


const Profile = () => {
  return (
    <IsLoggedIn>
      <ProfilePage />
    </IsLoggedIn>
    
  );
};

export default multi(Profile);
