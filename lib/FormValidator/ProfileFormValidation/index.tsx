import BasicFormValidation from '../BasicFormValidation';
import {
  Date as SchemaDate,
  Location,
  ClientType,
} from '../../../generated/graphql';
import { ProfileState } from '../../../components/User/Profile';
import { minBirthYear, minAge } from '../../../components/General/Preferences';

class ProfileFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isFirstNameValid = (firstName: string | undefined) => {
    return (
      this.isFieldNotEmpty(firstName) &&
      this.doesFieldNotContainNumber(firstName)
    );
  };

  isLastNameValid = (lastName: string | undefined) => {
    return (
      this.isFieldNotEmpty(lastName) && this.doesFieldNotContainNumber(lastName)
    );
  };

  isEmailValid = (email: string | undefined) => {
    return this.isEmailFormatValid(email);
  };

  isBirthDateValid = (birthDate: SchemaDate | undefined) => {
    // Seule validation nécessaire est l'année
    // On veut seulement vérifier que le user a plus de 16 ans et moins de de 120 ans
    return (
      birthDate &&
      birthDate.year >= minBirthYear &&
      birthDate.year <= new Date().getFullYear() - minAge
    );
  };

  isLocationValid = (location: Location) => {
    return (
      location.name !== '' &&
      location.longitude !== 0 &&
      location.latitude !== 0
    );
  };

  isWillingToChangePassword = (password: string | undefined) => {
    return this.isFieldNotEmpty(password);
  };

  isPasswordValid = (password: string | undefined) => {
    return this.isFieldNotEmpty(password);
  };

  isConfirmPasswordValid = (
    confirmPassowrd: string | undefined,
    password: string | undefined,
  ) => {
    return this.doPasswordsMatch(password, confirmPassowrd);
  };

  firstNameError = (firstName: string | undefined) => {
    if (!this.isFieldNotEmpty(firstName)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.firstNameError
        .emptyError;
    }
    if (!this.doesFieldNotContainNumber(firstName)) {
      return this.general.formFieldsErrors.signupFormFieldsErrors.firstNameError
        .containsNumberError;
    }
  };

  lastNameError = (lastMame: string | undefined) => {
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

  confirmPasswordError = (
    password: string | undefined,
    confirmPassowrd: string | undefined,
  ) => {
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

  isProfileFormStateValid = (state: ProfileState) => {
    return (
      (state.clientType === ClientType.Individual
        ? this.isFirstNameValid(state.firstName) &&
          this.isLastNameValid(state.lastName) &&
          this.isBirthDateValid(state.birthDate)
        : true) && // do company validation
      this.isEmailFormatValid(state.email) &&
      this.isLocationValid(state.location) &&
      (this.isWillingToChangePassword(state.password)
        ? this.isConfirmPasswordValid(state.password, state.confirmPassword)
        : true)
    );
  };
}

export default ProfileFormValidation;
