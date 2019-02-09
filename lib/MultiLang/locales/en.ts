import Translations from './types';

const translations: Translations = {
  login: {
    title: 'Login',
  },
  signup: {
    title: 'Create an account',
  },
  general: {
    email: 'Email',
    password: 'Password',
    confirmPassword: "Confirm password",
    changeLangage: 'Change langage',
    becomePremium: 'Go Premium',
    or: 'or',
    firstName: "First name",
    lastName: "Last name",
    gender: "Gender",
    birthDate: {
      day: "Day",
      month: "Month",
      year: "Year"
    }
  },
  errors: {
    invalidEmail: 'Invalid email',
    invalidPassword: 'Wrong password',
    authError: 'Authentification problem',
  },
};

module.exports = translations;
