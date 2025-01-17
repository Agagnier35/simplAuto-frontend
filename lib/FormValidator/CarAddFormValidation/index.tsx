import BasicFormValidation from '../BasicFormValidation';
import {
  minCarYear,
  maxMileage,
} from '../../../components/General/Preferences';

export class CarAddFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearValid = (year: number | null | undefined) => {
    if (!year) {
      return false;
    }
    return (
      this.isFieldNotEmpty(year.toString()) &&
      this.isNumberAnInteger(year) &&
      year >= minCarYear &&
      year <= new Date().getFullYear()
    );
  };

  isMileageValid = (mileage: number | null | undefined) => {
    if (!mileage) {
      return false;
    }
    return (
      this.isFieldNotEmpty(mileage.toString()) &&
      this.isNumberAnInteger(mileage) &&
      mileage >= 0 &&
      mileage <= maxMileage
    );
  };

  isPhotosValid = (photos: any[]) => {
    return photos.length >= 1;
  };

  yearError = (year: number | null | undefined) => {
    if (!year) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .emptyError;
    }
    if (!this.isFieldNotEmpty(year.toString())) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .emptyError;
    }
    if (!this.isNumberAnInteger(year)) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .numberNotIntegerError;
    }
    if (year < minCarYear) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .yearTooLowError;
    }
    if (year > new Date().getFullYear()) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .yearTooHighError;
    }
  };

  mileageError = (mileage: number | null | undefined) => {
    if (!mileage) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .emptyError;
    }
    if (!this.isFieldNotEmpty(mileage.toString())) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .emptyError;
    }
    if (!this.isNumberAnInteger(mileage)) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .numberNotIntegerError;
    }
    if (mileage < 0) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .mileageLesserThanZeroError;
    }
    if (mileage > maxMileage) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .mileageTooHighError;
    }
  };

  photosError = () => {
    return this.general.formFieldsErrors.cadAddFormFieldsErrors.photos
      .atLeastOnePhotoError;
  };

  isCarAddFormStateValid = (state: any) => {
    return (
      state.manufacturerID != null &&
      state.modelID != null &&
      state.categoryID != null &&
      this.isPhotosValid(state.photos) &&
      this.isMileageValid(state.mileage) &&
      this.isYearValid(state.year)
    );
  };
}
