import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Link from 'next/link'

class ProfileAccess extends Component<MultiProps>{

  handleAccessProfile = () => {

  }

  render() {
    return (
        <Form>
          <Link href="/profile">
            <img className="profileButton" src="../static/profileImage.png" />
          </Link>
        </Form>
    );
  }
}

export default multi(ProfileAccess);
