import React from 'react';
import MyAds from '../components/Ad/MyAds';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class MyAdsPage extends PrivateComponent {
  render() {
    return (
      <div>
        <MyAds />
      </div>
    );
  }
}

export default MyAdsPage;
