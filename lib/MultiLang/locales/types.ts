export default interface Translations {
  loading: String;
  login: {
    title: string;
  };
  signup: {
    title: string;
  };
  general: {
    email: string;
    password: string;
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
  };
  errors: {
    invalidEmail: string;
    invalidPassword: string;
    authError: string;
    carLimitReached: string;
  };
  cars: {
    details: string;
    title: string;
    manufacturer: string;
    model: string;
    category: string;
    year: string;
    mileage: string;
    price: string;
  };
  carFeatureCategory: { [key: string]: string };
  carCategory: { [key: string]: string };
  carFeature: { [key: string]: string };
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
}
