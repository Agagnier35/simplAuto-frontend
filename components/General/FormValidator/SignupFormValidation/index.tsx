// Retourner un message spécifique au cas où ça foire
class SignupFormValidation extends BasicFormValidation {
  constructor() {
    super();
  }

  firstNameError = () => {
    // return this.doesFieldContainNumber();
  };

  lastNameError = () => {
    return true;
  };

  passwordError = () => {
    return true;
  };
}
