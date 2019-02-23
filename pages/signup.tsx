import React from 'react';
import Signup from '../components/Signup';
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
