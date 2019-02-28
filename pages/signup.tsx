import React from 'react';
import Signup from '../components/Auth/Signup';
import PublicComponent from '../lib/Auth/PublicComponent';

class SignupPage extends PublicComponent {
  render() {
    return (
      <div>
        <Signup />
      </div>
    );
  }
}

export default SignupPage;
