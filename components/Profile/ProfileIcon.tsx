import React, { Component } from 'react';
import ProfileIconStyle from './ProfileIconStyle';
import { MultiProps } from '../../lib/MultiLang';
import Link from 'next/link'

class ProfileAccess extends Component<MultiProps>{

  render() {
    return (
        <ProfileIconStyle>
          <Link href="/profile">
            <img className="profileButton" src="../static/profileImage.png" />
          </Link>
        </ProfileIconStyle>
    );
  }
}

export default ProfileAccess;
