export default interface Translations {
  loading: String;
  login: {
    title: string;
  };
  signup: {
    title: string;
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
  };
  general: {
    email: string;
    password: string;
    changeLangage: string;
    becomePremium: string;
    or: string;
  };
  errors: {
    invalidEmail: string;
    invalidPassword: string;
    authError: string;
  };
  cars: {
    details: string;
    title: string;
    manufacturer: string;
    model: string;
    category: string;
    year: string;
    mileage: string;
  };
  carFeatureCategory: { [key: string]: string };
  carCategory: { [key: string]: string };
  carFeature: { [key: string]: string };
}
