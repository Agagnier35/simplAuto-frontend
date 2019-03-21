import { Dictionary } from '../../Types/Dictionary';

export default interface Translations {
  loading: String;
  login: {
    title: string;
    loginWithFacebook: string;
    loginWithGoogle: string;
    forgotPassword: string;
  };
  signup: {
    title: string;
    clientType: string;
    facebookLogin: string;
    googleLogin: string;
  };
  profile: {
    profilePage: string;
    firstName: string;
    lastName: string;
    location: string;
    sex: string;
    save: string;
    search: string;
    birth: string;
    male: string;
    female: string;
    other: string;
    address: string;
    changePassword: string;
    confirmationChangePassword: string;
    contactInfo: string;
    genrealInfo: string;
    newPWSection: string;
  };
  general: {
    email: string;
    password: string;
    confirmPassword: string;
    changeLangage: string;
    becomePremium: string;
    or: string;
    defaultDropdown: string;
    other: string;
    none: string;
    features: string;
    submit: string;
    images: string;
    min: string;
    max: string;
    firstName: string;
    lastName: string;
    companyName: string;
    gender: string;
    birthDate: {
      day: string;
      month: string;
      year: string;
    };
    options: {
      delete: string;
      modify: string;
    };
    resetPw: string;
    buy: string;
    sell: string;
    myCars: string;
    myAds: string;
    disconnect: string;
    Ad: string;
    offers: string;
    delete: string;
    cancel: string;
    create: string;
    update: string;
    print: string;
    offered: string;
  };
  errors: {
    invalidEmail: string;
    invalidPassword: string;
    authError: string;
    carLimitReached: string;
  };
  cars: {
    addCar: string;
    details: string;
    title: string;
    manufacturer: string;
    model: string;
    category: string;
    year: string;
    mileage: string;
    price: string;
    descriptionPlaceholder: string;
  };
  clientType: {
    company: string;
    individual: string;
  };
  carFeatureCategory: { [key: string]: string };
  carCategory: { [key: string]: string };
  carLabel: {
    title: string;
    carAddSumbit: string;
    general: string;
    uploadBtn: string;
    condition: string;
    upload: string;
    addons: string;
    uploadLength: string;
  };
  ad: {
    createAdTitle: string;
    createAdAction: string;
  };
  Ads: {
    lowerPrice: string;
    higherPrice: string;
    manufacturer: string;
    model: string;
    category: string;
    lowerMileage: string;
    higherMileage: string;
    lowerYear: string;
    higherYear: string;
    features: string;
    addAds: string;
    title: string;
  };
  offers: {
    createOffer: string;
    modifyOffer: string;
    addons: string;
    otherAddons: string;
    specify: string;
    title: string;
    price: string;
    chat: string;
    reject: string;
    receivedOffers: string;
  };
  GeneralModalContent: {
    title: string;
    content: string;
    btnCancel: string;
    btnConfirm: string;
    car: string;
    ad: string;
    offer: string;
    create: string;
    delete: string;
    save: string;
    edit: string;
  };
  Home: {
    BannerTitle: string;
    BannerSubtitle: string;
    LandingTitle: string;
    LandingSubtitle: string;
    LandingAdsButton: string;
    LandingSignupButton: string;
    HowToBuy: string;
    HowToBuyFirst: string;
    HowToBuySecond: string;
    HowToBuyThird: string;
    HowToSell: string;
    HowToSellFirst: string;
    HowToSellSecond: string;
    HowToSellThird: string;
  };
  Chat: {
    title: string;
    send: string;
    sendPlaceholder: string;
  };
  Notifications: {
    newOffer: string;
    newOfferMessage: (x: number) => string;
  };
  Stripe: {
    PremiumName: string;
    PremiumDescription: string;
  };
  offerAddons: {
    subtitle: string;
    mags: string;
    tires: string;
  };
  carFeature: Dictionary<{
    color: Dictionary<{
      black: string;
      blue: string;
      brown: string;
      gold: string;
      green: string;
      grey: string;
      orange: string;
      pink: string;
      purple: string;
      red: string;
      silver: string;
      tan: string;
      teal: string;
      white: string;
      yellow: string;
      other: string;
    }>;
    fuelType: Dictionary<{
      diesel: string;
      electric: string;
      gasoline: string;
      hybrid: string;
      other: string;
    }>;
    doorNumber: Dictionary<{
      2: string;
      3: string;
      4: string;
      5: string;
      other: string;
    }>;
    seatNumber: Dictionary<{
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      other: string;
    }>;
    drivetrain: Dictionary<{
      '4x4': string;
      awd: string;
      fwd: string;
      rwd: string;
      other: string;
    }>;
    transmission: Dictionary<{
      manual: string;
      automatic: string;
      other: string;
    }>;
    true: string;
    false: string;
  }>;
}
