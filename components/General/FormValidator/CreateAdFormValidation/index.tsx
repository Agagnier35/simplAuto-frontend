import BasicFormValidation from '../BasicFormValidation';
class CreateAdFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearLowerBoundValid = (yearLowerBound: number) => {
    return (
      this.isFieldNotEmpty(yearLowerBound.toString()) &&
      this.isNumberAnInteger(yearLowerBound)
    );
  };

  isYearHigherBoundValid = (
    yearLowerBound: number,
    yearHigherBound: number,
  ) => {
    return (
      this.isFieldNotEmpty(yearHigherBound.toString()) &&
      this.isNumberAnInteger(yearLowerBound) &&
      yearLowerBound <= yearHigherBound
    );
  };

  isMileageLowerBoundValid = (mileageLowerBound: number) => {
    return (
      this.isFieldNotEmpty(mileageLowerBound.toString()) &&
      this.isNumberAnInteger(mileageLowerBound)
    );
  };

  isMileageHigherBoundValid = (
    mileageLowerBound: number,
    mileageHigherBound: number,
  ) => {
    return (
      this.isFieldNotEmpty(mileageHigherBound.toString()) &&
      this.isNumberAnInteger(mileageHigherBound) &&
      mileageLowerBound <= mileageHigherBound
    );
  };

  isPriceLowerBoundValid = (priceLowerBound: number) => {
    return (
      this.isFieldNotEmpty(priceLowerBound.toString()) &&
      this.isNumberAnInteger(priceLowerBound)
    );
  };

  isPriceHigherBoundValid = (
    priceLowerBound: number,
    priceHigherBound: number,
  ) => {
    return (
      this.isFieldNotEmpty(priceHigherBound.toString()) &&
      this.isNumberAnInteger(priceHigherBound) &&
      priceLowerBound < priceHigherBound
    );
  };

  yearLowerBoundError = (yearLowerBound: number) => {
    if (!this.isFieldNotEmpty(yearLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.emptyError;
    } else if (!this.isNumberAnInteger(yearLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.numberNotIntegerError;
    }
  };

  yearHigherBoundError = (yearLowerBound: number, yearHigherBound: number) => {
    if (!this.isFieldNotEmpty(yearHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(yearLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.numberNotIntegerError;
    } else if (!(yearLowerBound <= yearHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.yearLowerBoundHigherThanYearHigherBoundError;
    }
  };

  mileageLowerBoundError = (mileageLowerBound: number) => {
    if (!this.isFieldNotEmpty(mileageLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.emptyError;
    } else if (!this.isNumberAnInteger(mileageLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.numberNotIntegerError;
    }
  };

  mileageHigherBoundError = (
    mileageLowerBound: number,
    mileageHigherBound: number,
  ) => {
    if (!this.isFieldNotEmpty(mileageHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(mileageHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.numberNotIntegerError;
    } else if (!(mileageLowerBound <= mileageHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.mileageLowerBoundHigherThanMileageHigherBoundError;
    }
  };

  priceLowerBoundError = (priceLowerBound: number) => {
    if (!this.isFieldNotEmpty(priceLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.emptyError;
    } else if (!this.isNumberAnInteger(priceLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.numberNotIntegerError;
    }
  };

  priceHigherrBoundError = (
    priceLowerBound: number,
    priceHigherBound: number,
  ) => {
    if (!this.isFieldNotEmpty(priceHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(priceHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.numberNotIntegerError;
    } else if (!(priceLowerBound < priceHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.priceLowerBoundHigherThanPriceHigherBoundError;
    }
  };
}

export default CreateAdFormValidation;
