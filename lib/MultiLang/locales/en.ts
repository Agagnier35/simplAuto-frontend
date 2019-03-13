import Translations from './types';

const translations: Translations = {
  loading: 'Loading ...',
  login: {
    title: 'Login',
    loginWithFacebook: 'Login with Facebook',
    loginWithGoogle: 'Login with Google',
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
    formFieldsErrors: {
      signupFormFieldsErrors: {
        firstNameError: {
          emptyError: 'First name cannot be empty.',
          containsNumberError: 'First name cannot contain a number.',
        },
        lastNameError: {
          emptyError: 'Last name cannot be empty.',
          containsNumberError: 'Last name cannot contain a number.',
        },
        emailError: {
          invalidEmailError: 'Email format is invalid.',
        },
        passwordError: {
          emptyError: 'Password cannot be empty.',
        },
        confirmPasswordError: {
          emptyError: 'Confirmation password cannot be empty.',
          matchingError: 'Passwords do not match.',
        },
        locationError: {
          emptyError: 'Location cannot be empty.',
        },
      },
      createAdFormFieldsErrors: {
        yearLowerBound: {
          yearLowerBoundTooLow: 'Year min too low',
          yearLowerBoundTooHigh: 'Year min cannot be greater than current year',
          emptyError: 'Year min cannot be empty',
          numberNotIntegerError: 'Year min must be an integer',
        },
        yearHigherBound: {
          yearHigherBoundTooLow: 'Year max too low',
          yearHigherBoundTooHigh:
            'Year max cannot be greater than current year',
          emptyError: 'Year max cannot be empty',
          numberNotIntegerError: 'Year max must be an integer',
          yearLowerBoundHigherThanYearHigherBoundError:
            'Year max must be higher than year min',
        },
        mileageLowerBound: {
          mileageLowerBoundTooLow: 'Mileage min must be positive',
          mileageLowerBoundTooHigh: 'Mileage min too high',
          emptyError: 'Mileage min cannot be empty',
          numberNotIntegerError: 'Mileage min must be an integer',
        },
        mileageHigherBound: {
          mileageHigherBoundTooLow: 'Mileage max must be positive',
          mileageHigherBoundTooHigh: 'Mileage max too high ',
          emptyError: 'Mileage min cannot be empty',
          numberNotIntegerError: 'Mileage min must be an integer',
          mileageLowerBoundHigherThanMileageHigherBoundError:
            'Mileage max must be higher than mileage min',
        },
        priceLowerBound: {
          emptyError: 'Price min cannot be empty',
          numberNotIntegerError: 'Price min must be an integer',
        },
        priceHigherBound: {
          emptyError: 'Price max cannot be empty',
          numberNotIntegerError: 'Price max must be an integer',
          priceLowerBoundHigherThanPriceHigherBoundError:
            'Price max must be higher than price min',
        },
      },
      cadAddFormFieldsErrors: {
        year: {
          emptyError: 'Year cannot be empty',
          numberNotIntegerError: 'Year must be an integer',
          yearTooLowError: 'Year is too low. Go sell that shit somewhere else',
          yearTooHighError: 'Year too high',
        },
        mileage: {
          emptyError: 'Mileage cannot be empty',
          numberNotIntegerError: 'Mileage must be an integer',
          mileageLesserThanZeroError: 'Mileage must be greater than 0',
          mileageTooHighError: 'Mileage too high',
        },
        photos: {
          atLeastOnePhotoError: 'You must add at least one photo',
        },
      },
    },
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
    title: 'Offer',
    price: 'Price',
    chat: 'Contact seller',
    reject: 'Reject offer',
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
