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
  carLabel: {
    title: string,
    general: string,
    description: string,
    uploadBtn: string,
    condition: string,
    year: string,
    make: string,
    model: string,
    color: string,
    doors: string,
    seats: string,
    driveTrain: string,
    type: string,
    transmission: string,
    fuel: string,
    kilometers: string,
    upload: string,
    addons: string,
    uploadLength: string,
  },
  condition: {
    brandNew: string,
    used: string,
    lease: string,
  }
  transmission: {
    manual: string,
    automatic: string,
  }
  fuel: {
    gas: string,
    diesel: string,
  }
}
