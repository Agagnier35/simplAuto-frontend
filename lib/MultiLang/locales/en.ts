import Translations from './types';

const translations: Translations = {
  loading: 'Loading ...',
  login: {
    title: 'Login',
    loginWithFacebook: 'Login with Facebook',
    loginWithGoogle: 'Login with Google'
  },
  signup: {
    title: 'Create an account',
  },
  profile: {
    profilePage: 'My profile',
    firstName: 'First name',
    lastName: 'Last name',
    location: 'Your position',
    sex: 'Sex',
    save: 'Save',
    search: 'Search',
    birth: 'Birth date',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    address: 'Type Your Address',
    changePassword: 'New Password',
    confirmationChangePassword: 'Confirm New Password',
    contactInfo: 'Contact Information',
    genrealInfo: 'General Information',
    newPWSection: 'New Password',
  },
  general: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
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
    firstName: 'First name',
    lastName: 'Last name',
    gender: 'Gender',
    birthDate: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    options: {
      delete: 'Delete',
      modify: 'Modify',
    },
    resetPw: 'Reset password',
    buy: 'Buy',
    sell: 'Sell',
    myAds: 'My ads',
    myCars: 'My cars',
    disconnect: 'Logout',
    Ad: 'Ad',
    offers: 'Offers',
    delete: 'Delete',
    cancel: 'Cancel',
    create: 'Create',
    update: 'Update',
    print: 'Print',
  },
  errors: {
    invalidEmail: 'Invalid email',
    invalidPassword: 'Wrong password',
    authError: 'Authentification problem',
    carLimitReached: 'You have reached the limit of cars you can create',
  },
  cars: {
    addCar: 'Add a car',
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
  Ads: {
    lowerPrice: 'Lower Price',
    higherPrice: 'Higher Price',
    manufacturer: 'Manufacturer',
    model: 'Model',
    category: 'Category',
    lowerMileage: 'Lower Mileage',
    higherMileage: 'Higher Mileage',
    lowerYear: 'Lower Year',
    higherYear: 'Higher Year',
    features: 'features',
    addAds: 'Add an Ad',
  },
  ad: {
    createAdTitle: 'Please fill the information about your ad',
    createAdAction: 'Publish your ad',
  },
  offers: {
    createOffer: 'Make an offer',
    modifyOffer: 'Modify my offer',
    addons: 'Addons',
    otherAddons: 'Other addon',
    specify: 'Specify',
  },
  GeneralModalContent: {
    title: 'Confirmation Dialog',
    content:
      'Are you sure you want to do this action?\nThis action can not be undone. ',
    btnCancel: 'Cancel',
    btnConfirm: 'Confirm',
    car: 'Car',
    ad: 'Ad',
    offer: 'Offer',
    create: 'Create',
    delete: 'Delete',
    save: 'Save',
    edit: 'Edit',
  },
};

module.exports = translations;
