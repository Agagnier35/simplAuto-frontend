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
    confirmPassword: string;
    changeLangage: string;
    becomePremium: string;
    or: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: {
      day: string,
      month: string,
      year: string
    };
    resetPw: string;
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
