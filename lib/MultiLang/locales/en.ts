import Translations from './types';

const translations: Translations = {
  loading: 'Loading ...',
  login: {
    title: 'Login',
  },
  signup: {
    title: 'Create an account',
  },
  general: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    changeLangage: 'Change langage',
    becomePremium: 'Go Premium',
    or: 'or',
    firstName: 'First name',
    lastName: 'Last name',
    gender: 'Gender',
    birthDate: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    resetPw: 'Reset password',
    buy: 'Buy',
    sell: 'Sell',
    myCars: 'My cars',
    ads: 'Ads',
    disconnect: 'Logout',
  },
  errors: {
    invalidEmail: 'Invalid email',
    invalidPassword: 'Wrong password',
    authError: 'Authentification problem',
  },
  cars: {
    details: 'Car details',
    title: 'My Cars',
    manufacturer: 'Manufacturer',
    model: 'Model',
    category: 'Category',
    year: 'Year',
    mileage: 'Mileage',
  },
  carFeatureCategory: {
    color: 'color',
    fuelType: 'Fuel Type',
    doorNumber: 'Door Number',
    seatNumber: 'Seat Number',
    driveTrain: 'Drive Train',
    transmission: 'Transmission',
    sunroof: 'Sun Roof',
    cruiseControl: 'Cruise Control',
    trailerHitch: 'Trailer Hitch',
    airConditioning: 'Air Conditioning',
    aileron: 'Aileron',
    motor: 'Motor',
  },
  carCategory: {
    sedan: 'sedan',
  },
  carFeature: {},
};

module.exports = translations;
