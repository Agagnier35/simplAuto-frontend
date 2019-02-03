import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import ProfilePage from '../components/ProfileIcon/profilePage';


const Profile = ({
  
}: MultiProps) => {
  return (
    <div>
      <ProfilePage />
    </div>
    
  );
};

export default multiUpdater(Profile);
