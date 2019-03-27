import BasicFormValidation from '../BasicFormValidation';
import { Location, ClientType, Date } from '../../../generated/graphql';
import { SignupState } from '../../../components/Auth/Signup';
import { minBirthYear, minAge } from '../../../components/General/Preferences';
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

  isBirthDateValid = (birthDate: Date | undefined) => {
    // Seule validation nécessaire est l'année
    // On veut seulement vérifier que le user a plus de 16 ans et moins de de 120 ans
    return (
      birthDate &&
      birthDate.year > minBirthYear &&
      birthDate.year <= new Date().getFullYear() - minAge
    );
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

  isLocationValid = (location: Location) => {
    return (
      location.name !== '' &&
      location.longitude !== 0 &&
      location.latitude !== 0
    );
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
      return this.general.formFieldsErrors.signupFormFieldsErrors
        .confirmPasswordError.emptyError;
    }
    if (!this.doPasswordsMatch(password, confirmPassowrd)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors
        .confirmPasswordError.matchingError;
    }
  };

  locationError = () => {
    return this.general.formFieldsErrors.signupFormFieldsErrors.locationError
      .emptyError;
  };

  isSignupFormStateValid = (state: SignupState) => {
    return (
      (state.clientType === ClientType.Individual
        ? this.isFirstNameValid(state.firstName) &&
          this.isLastNameValid(state.lastName) &&
          this.isBirthDateValid(state.birthDate)
        : true) && // do company validation
      this.isEmailValid(state.email) &&
      this.isPasswordValid(state.password) &&
      this.isConfirmPasswordValid(state.confirmPassword, state.password) &&
      this.isLocationValid(state.location)
    );
  };
}

export default SignupFormValidation;
