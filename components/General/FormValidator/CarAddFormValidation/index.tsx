import BasicFormValidation from '../BasicFormValidation';
class CarAddFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearValid = (year: number | null | undefined) => {
    if (year == null || year == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(year.toString()) &&
      this.isNumberAnInteger(year) &&
      year > 1900 &&
      year < 2018
    );
  };

  isMileageValid = (mileage: number | null | undefined) => {
    if (mileage == null || mileage == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(mileage.toString()) &&
      this.isNumberAnInteger(mileage) &&
      mileage > 0 &&
      mileage < 300000
    );
  };

  isPhotosValid = (photos: any[]) => {
    return photos.length >= 1;
  };

  yearError = (year: number | null | undefined) => {
    if (year == null || year == undefined) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .emptyError;
    } else if (!this.isFieldNotEmpty(year.toString())) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .emptyError;
    } else if (!this.isNumberAnInteger(year)) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .numberNotIntegerError;
    } else if (year < 1900) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .yearTooLowError;
    } else if (year > 2019) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.year
        .yearTooHighError;
    }
  };

  mileageError = (mileage: number | null | undefined) => {
    if (mileage == null || mileage == undefined) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .emptyError;
    } else if (!this.isFieldNotEmpty(mileage.toString())) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .emptyError;
    } else if (!this.isNumberAnInteger(mileage)) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .numberNotIntegerError;
    } else if (mileage < 0) {
      return this.general.formFieldsErrors.cadAddFormFieldsErrors.mileage
        .mileageLesserThanZeroError;
    } else if (mileage > 300000) {
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

export default CarAddFormValidation;