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
    changeLangage: 'Change langage',
    becomePremium: 'Go Premium',
    or: 'or',
    defaultDropdown: 'Please Select',
    other: 'Other',
    none: 'Not specified',
    features: 'Features',
    submit: 'Submit',
    images: 'Images',
    max: 'max',
    min: 'min',
  },
  errors: {
    invalidEmail: 'Invalid email',
    invalidPassword: 'Wrong password',
    authError: 'Authentification problem',
    carLimitReached: 'You have reached the limit of cars you can create',
  },
  cars: {
    details: 'Car details',
    title: 'My Cars',
    manufacturer: 'Manufacturer',
    model: 'Model',
    category: 'Category',
    year: 'Year',
    mileage: 'Mileage',
    price: 'Price',
  },
  carFeatureCategory: {
    color: 'color',
    fuelType: 'Fuel Type',
    doorNumber: 'Door Number',
    seatNumber: 'Seat Number',
    drivetrain: 'Drive Train',
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
  carLabel: {
    title: 'Please fill the information about your car',
    general: 'General information',
    uploadBtn: 'Select Image',
    condition: 'Condition',
    carAddSumbit: 'Add this car',
    addons: 'Add-ons',
    upload: 'Upload up to 7 pictures',
    uploadLength: 'Please select between 1 and 7 pictures',
  },
  ad: {
    createAdTitle: 'Please fill the information about your ad',
    createAdAction: 'Publish your ad',
  },
};

module.exports = translations;
