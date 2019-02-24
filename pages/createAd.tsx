import React from 'react';
import CreateAd from '../components/CreateAd';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class CreateAdPage extends PrivateComponent {
  render() {
    return (
      <div>
        <CreateAd />
      </div>
    );
  }
}

export default CreateAdPage;
