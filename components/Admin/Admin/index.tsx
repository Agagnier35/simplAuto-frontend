import React from 'react';
import SearchUser from '../SearchUser';

export interface AdminPageProps {}

const AdminPage = (props: AdminPageProps) => {
  return (
    <div>
      <SearchUser />
    </div>
  );
};

export default AdminPage;
