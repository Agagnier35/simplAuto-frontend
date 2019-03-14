import BasicFormValidation from '../BasicFormValidation';
class ProfileFormValidation extends BasicFormValidation {
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

  isBirthDateValid = (birthDate: string) => {
    // Seule validation nécessaire est l'année
    // On veut seulement vérifier que le user a plus de 16 ans et moins de de 120 ans
    return (
      parseInt(birthDate.substring(0, 4)) > 1900 &&
      parseInt(birthDate.substring(0, 4)) <= new Date().getFullYear() - 16
    );
  };

  isWillingToChangePassword = (password: string) => {
    return this.isFieldNotEmpty(password);
  };

  // Pas nécéssaire
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

  birthDateError = () => {
    return this.general.formFieldsErrors.signupFormFieldsErrors.birthDateError
      .invalidYearError;
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

  isProfileFormStateValid = (state: any) => {
    return (
      this.isFirstNameValid(state.firstName) &&
      this.isLastNameValid(state.lastName) &&
      this.isEmailFormatValid(state.email) &&
      this.isBirthDateValid(
        state.birthDate.year.toString() +
          '-' +
          state.birthDate.month.toString() +
          '-' +
          state.birthDate.day.toString(),
      ) &&
      (this.isWillingToChangePassword(state.password)
        ? this.isConfirmPasswordValid(state.password, state.confirmPassowrd)
        : true)
    );
  };
}

export default ProfileFormValidation;
