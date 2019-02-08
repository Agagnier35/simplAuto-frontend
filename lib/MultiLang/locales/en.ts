import Translations from './types';

const translations: Translations = {
  login: {
    title: 'Login',
  },
  signup: {
    title: 'Create an account',
  },
  profile: {
    firstName: 'First name',
    lastName: 'Last name',
    location: 'Your position',
    sex: 'Sex',
    save: 'Save',
    search: 'Search',
    birth: 'Birth date',
    male: 'male',
    female: 'female',
    other: 'other',
    address: 'Type your address',
  },
  general: {
    email: 'Email',
    password: 'Password',
    changeLangage: 'Change langage',
    becomePremium: 'Go Premium',
    or: 'or',
  },
  errors: {
    invalidEmail: 'Invalid email',
    invalidPassword: 'Wrong password',
    authError: 'Authentification problem',
  },
};

module.exports = translations;
