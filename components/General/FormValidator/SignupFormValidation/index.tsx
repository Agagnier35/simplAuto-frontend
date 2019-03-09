import BasicFormValidation from '../BasicFormValidation';
class SignupFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isFirstNameValid = (firstName: string) => {
    return (
      this.isFieldNotEmpty(firstName) &&
      this.doesFieldNotContainNumber(firstName)
    );
  };

  isLastNameValid = (lastName: string) => {
    return (
      this.isFieldNotEmpty(lastName) && this.doesFieldNotContainNumber(lastName)
    );
  };

  isEmailValid = (email: string) => {
    return this.isEmailFormatValid(email);
  };

  isPasswordValid = (password: string) => {
    return this.isFieldNotEmpty(password);
  };

  isConfirmPasswordValid = (confirmPassowrd: string, password: string) => {
    return (
      this.isFieldNotEmpty(confirmPassowrd) &&
      this.doPasswordsMatch(password, confirmPassowrd)
    );
  };

  isLocationValid = (location: string) => {
    return this.isFieldNotEmpty(location);
  };

  firstNameError = (firstName: string) => {
    if (!this.isFieldNotEmpty(firstName)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.firstNameError
        .emptyError;
    }
    if (!this.doesFieldNotContainNumber(firstName)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.firstNameError
        .containsNumberError;
    }
  };

  lastNameError = (lastMame: string) => {
    if (!this.isFieldNotEmpty(lastMame)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.lastNameError
        .emptyError;
    }
    if (!this.doesFieldNotContainNumber(lastMame)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.lastNameError
        .containsNumberError;
    }
  };

  emailError = () => {
    return this.general.formFieldsErrors.signupFormFieldsErrors.emailError
      .invalidEmailError;
  };

  passwordError = () => {
    return this.general.formFieldsErrors.signupFormFieldsErrors.passwordError
      .emptyError;
  };

  confirmPasswordError = (password: string, confirmPassowrd: string) => {
    if (!this.isFieldNotEmpty(confirmPassowrd)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.passwordError
        .emptyError;
    }
    if (!this.doPasswordsMatch(password, confirmPassowrd)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.passwordError
        .matchingError;
    }
  };

  locationError = () => {
    return this.general.formFieldsErrors.signupFormFieldsErrors.locationError
      .matchingError;
  };
}

export default SignupFormValidation;
