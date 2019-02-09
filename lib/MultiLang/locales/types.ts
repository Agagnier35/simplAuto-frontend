export default interface Translations {
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
  };
  errors: {
    invalidEmail: string;
    invalidPassword: string;
    authError: string;
  };
}
