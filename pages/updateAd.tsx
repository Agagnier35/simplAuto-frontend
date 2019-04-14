import React from 'react';
import UpdateAd from '../components/Ad/UpdateAd';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class UpdateAdPage extends PrivateComponent {
  render() {
    return (
      <div>
        <UpdateAd {...this.props} />
      </div>
    );
  }
}

export default UpdateAdPage;
