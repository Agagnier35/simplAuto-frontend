import Translations from './types';

const translations: Translations = {
  loading: 'Loading ...',
  login: {
    title: 'Login',
    loginWithFacebook: 'Login with Facebook',
    loginWithGoogle: 'Login with Google',
    forgotPassword: 'Forgot password ?',
  },
  signup: {
    title: 'Create an account',
    clientType: 'Account type',
    facebookLogin: 'Login with Facebook',
    googleLogin: 'Login with Google',
    location: 'Your adress',
  },
  confirmation: {
    title: 'Accept an offer',
    contract: 'Contract',
    content:
      'Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ' +
      'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' +
      'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
      'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
      'sunt in culpa qui officia deserunt mollit anim id est laborum.',
    confirmation: 'Confirm',
    cancel: 'Cancel',
    read: 'I have read the conditions above',
  },
  profile: {
    profilePage: 'My profile',
    firstName: 'First name',
    lastName: 'Last name',
    companyName: 'Company name',
    location: 'Your position',
    sex: 'Gender',
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
    notificattionSettings: 'Notifications settings',
    email: 'Email',
    inApp: 'Application',
    notificationOffer: 'New offer',
    notificationMessage: 'New message',
  },
  general: {
    yourOffers: 'Your offers',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    changeLangage: 'Change langage',
    becomePremium: 'Go Premium',
    or: 'or',
    defaultDropdown: 'Please Select',
    defaultUnselect: 'Unselect field',
    other: 'Other',
    anything: 'Anything',
    none: 'Not specified',
    features: 'Features',
    submit: 'Submit',
    images: 'Images',
    max: 'max',
    min: 'min',
    firstName: 'First name',
    lastName: 'Last name',
    companyName: 'Company name',
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
    myConversations: 'Messages',
    myAds: 'My ads',
    myCars: 'My cars',
    disconnect: 'Logout',
    Ad: 'Ad',
    offers: 'Your offers',
    delete: 'Delete',
    cancel: 'Cancel',
    create: 'Create',
    update: 'Update',
    print: 'Print',
    offered: 'Offered',
    memberSince: 'Member since',
    accept: 'Accept offer',
    radius: 'Radius (KM)',
    langage: 'Language',
    langages: {
      english: 'English',
      french: 'French',
    },
    description: 'Description',
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
          matchingError:
            'Invalid Location, please select an element in the list',
        },
        birthDateError: {
          invalidYearError: 'The year is invalid.',
        },
      },
      createAdFormFieldsErrors: {
        yearLowerBound: {
          yearLowerBoundTooLow: 'Year min too low',
          yearLowerBoundTooHigh:
            'Year min cannot be greater than the current year',
          numberNotIntegerError:
            'Year min must be an integer (no comma or dot in the number)',
        },
        yearHigherBound: {
          yearHigherBoundTooLow: 'Year max too low',
          yearHigherBoundTooHigh:
            'Year max cannot be greater than the current year',
          numberNotIntegerError:
            'Year max must be an integer (no comma or dot in the number)',
          yearLowerBoundHigherThanYearHigherBoundError:
            'Year max must be higher than year min',
        },
        mileageLowerBound: {
          mileageLowerBoundTooLow: 'Mileage min must be positive',
          mileageLowerBoundTooHigh: 'Mileage min too high',
          numberNotIntegerError:
            'Mileage min must be an integer (no comma or dot in the number)',
        },
        mileageHigherBound: {
          mileageHigherBoundTooLow: 'Mileage max must be positive',
          mileageHigherBoundTooHigh: 'Mileage max too high ',
          numberNotIntegerError:
            'Mileage min must be an integer (no comma or dot in the number)',
          mileageLowerBoundHigherThanMileageHigherBoundError:
            'Mileage max must be higher than mileage min',
        },
        priceLowerBound: {
          priceLowerBoundTooLowError: 'Price min must be positive',
          numberNotIntegerError:
            'Price min must be an integer (no comma or dot in the number)',
        },
        priceHigherBound: {
          numberNotIntegerError:
            'Price max must be an integer (no comma or dot in the number)',
          priceLowerBoundHigherThanPriceHigherBoundError:
            'Price max must be higher than price min',
        },
      },
      cadAddFormFieldsErrors: {
        year: {
          emptyError: 'Year cannot be empty',
          numberNotIntegerError:
            'Year must be an integer (no comma or dot in the number)',
          yearTooLowError: 'Year is too low.',
          yearTooHighError: 'Year too high',
        },
        mileage: {
          emptyError: 'Mileage cannot be empty',
          numberNotIntegerError:
            'Mileage must be an integer (no comma or dot in the number)',
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
    cars: 'Cars',
    addCar: 'Add a car',
    details: 'Car details',
    title: 'My Cars',
    manufacturer: 'Manufacturer',
    model: 'Model',
    category: 'Category',
    year: 'Year',
    mileage: 'Kilometers',
    price: 'Price',
    descriptionPlaceholder: 'Enter a small description for the car',
    noCars: 'No cars yet',
  },
  clientType: {
    company: 'Company',
    individual: 'Individual',
  },
  carFeatureCategory: {
    color: 'Color',
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
    SUV: 'SUV',
    Sedan: 'Sedan',
    Pickup: 'Pickup',
    Wagon: 'Wagon',
    Hatchback: 'Hatchback',
    Coupe: 'Coupe',
    Convertible: 'Convertible',
    Chassis: 'Chassis',
    Truck: 'Truck',
    Van: 'Van',
    Crossover: 'Crossover',
    'Incomplete - Cutaway': 'Incomplete - Cutaway',
    Bus: 'Bus',
    Incomplete: 'Incomplete',
    Liftback: 'Liftback',
    'Motorcycle - Street': 'Motorcycle - Street',
    'Motorcycle - Scooter': 'Motorcycle - Scooter',
    'Motorcycle - Sport': 'Motorcycle - Sport',
    Minivan: 'Minivan',
    'Truck - Tractor': 'Truck - Tractor',
  },
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
    addAds: 'Create an Ad',
    updateAd: 'Update your Ad',
    title: 'Ads',
    noAds: 'No ads yet',
    noMatchingAds: 'There are no ads correponding to your car in your area',
  },
  ad: {
    createAdTitle: 'Please fill the information about your ad',
    createAdAction: 'Publish your ad',
    buyTopAd: 'Make priority',
    buyUrgentAd: 'Make urgent',
    AdSuggestion: 'Here are all the buyers who could be interested in your car',
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
    receivedOffers: 'Received offers',
    youMayLike: 'You may also like',
    noMatch: 'There is no 100% match offres',
    noAdsInYourArea: 'There are no ads in your area',
    noOffers: 'There are no offers on this ad',
    from: 'From',
    to: 'To',
    youHaveBeenOffered: 'You have been offered',
    youHaveOffered: 'You have offered',
    acceptedOfferCloseBtn: 'Close',
    acceptedOfferTitle: 'Accepted offer',
    acceptedOfferInstruction:
      'instuction coming from the contract that the buyer has signed :\n\n' +
      '- 3 buisness days to go try out the vehicle\n' +
      '- the offer has been accepted for the price on this offer\n' +
      '- the offer has been accepted for the proposed addons on this offer\n' +
      '- the offer has been accepted based on the informations given by the seller\n',
    add: 'Add',
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
  Home: {
    BannerTitle: 'So easy',
    BannerSubtitle: 'Buy or sell your car today!',
    LandingTitle: 'Let the sellers fight for you',
    LandingSubtitle: 'A new way to shop for your car',
    LandingAdsButton: 'See ads',
    LandingSignupButton: 'Create an account',
    HowToBuy: 'How to buy',
    HowToBuyFirst: 'Ask for a car',
    HowToBuySecond: 'Receive offers',
    HowToBuyThird: 'Accept the best one',
    HowToSell: 'How to sell',
    HowToSellFirst: 'Add a car',
    HowToSellSecond: 'Find a matching ad',
    HowToSellThird: 'Sell your car',
  },
  Chat: {
    title: 'Chat',
    send: 'Send',
    sendPlaceholder: 'Send a message',
    hideChat: 'Mute/unmute chat',
  },
  Notifications: {
    acceptedOffer: 'One of your offers has been accepted!',
    newOffer: 'You have a new offer!',
    newOfferMessage: (x: number) =>
      `You have ${x} new message${x > 1 ? 's' : ''} on an offer`,
  },
  Stripe: {
    PremiumName: 'SimplAuto Premium',
    PremiumDescription: 'Monthly membership',
    TopAdName: 'Priority Ad',
    TopAdDescription: 'On top for one week!',
    UrgentAdName: 'Urgent Ad',
    UrgentAdDescription: 'Stand out for one week!',
    CarSpotName: 'Extra car spot',
    CarSpotDescription: 'Additionnal spot for a car',
    CarSpotButton: 'Buy an extra car spot',
  },
  Premium: {
    Introduction: 'The advantages of a premium subscription',
    Join: 'Join now !',
    CarCreation: 'Add cars to your car park',
    AdCreation: 'Post ads for cars you are looking for',
    CarLimit: 'Car park Limit',
    Features: 'Feature',
    CarLimitUser: '2-5',
    CarLimitPremium: 'Unlimited',
    BasicStatistics: 'Basic statistics',
    PremiumStatistics: 'Whole range of statistics',
  },
  offerAddons: {
    subtitle: 'The seller offers also',
    mags: 'Mags',
    tires: 'Tires',
  },
  carFeature: {
    motor: {
      2: '2.0L',
      2.5: '2.5L',
    },
    color: {
      black: 'Black',
      blue: 'Blue',
      brown: 'Brown',
      gold: 'Gold',
      green: 'Green',
      grey: 'Grey',
      orange: 'Orange',
      pink: 'Pink',
      purple: 'Purple',
      red: 'Red',
      silver: 'Silver',
      tan: 'Tan',
      teal: 'Teal',
      white: 'White',
      yellow: 'Yellow',
      other: 'Other',
    },
    fuelType: {
      diesel: 'Diesel',
      electric: 'Electric',
      gasoline: 'Gasoline',
      hybrid: 'Hybrid',
      other: 'Other',
    },
    doorNumber: {
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      other: 'Other',
    },
    seatNumber: {
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      other: 'Other',
    },
    drivetrain: {
      '4x4': '4x4',
      awd: 'AWD',
      fwd: 'FWD',
      rwd: 'RWD',
      other: 'Other',
    },
    transmission: {
      manual: 'Manual',
      automatic: 'Automatic',
      other: 'Other',
    },
    true: 'Yes',
    false: 'No',
  },
  stats: {
    app: 'Stats for Simplauto',
    market: 'Stats for market',
    avgPrice: 'Average price',
    avgTime: 'Average days on market',
    marketAverage: 'Market average',
    appAverage: 'SimplAuto average',
    offerPrice: `Offer's price`,
    askedPrice: 'Researched price range',
    days: 'days',
    daysOnMarket: 'Days on market',
  },
  conversation: {
    noConversations: 'You have no conversations',
  },
  admin: {
    users: 'Users',
    stats: 'Statistics',
    overall: 'Overall Statistics',
    carResearch: 'Get statistics for a car',
    location: 'Where to look for',
    radius: 'Radius (KM)',
    results: 'Results',
    api: 'On the market',
    price: 'Prix',
    averagePrice: 'Average Price',
    dom: 'Days on market',
    averageDom: 'Average number of days on market',
    app: 'On this app',
    numberSold: 'Number sold',
    top10MakeModel: 'Top 10 of most sold cars',
    top10Fastest: 'Top 10 of fastest selling cars',
    bestSeller: 'Best seller on this platform',
    vehiculesCount: 'Count of all vehicules',
    adsCount: 'Count of all ads',
    activeUsers: 'Count of all active users',
    inactiveUsers: 'Count of all inactive users',
  },
};

module.exports = translations;
