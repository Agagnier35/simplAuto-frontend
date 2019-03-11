import BasicFormValidation from '../BasicFormValidation';
class CreateAdFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearLowerBoundValid = (yearLowerBound: number | null | undefined) => {
    if (yearLowerBound == null || yearLowerBound == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(yearLowerBound.toString()) &&
      this.isNumberAnInteger(yearLowerBound)
    );
  };

  isYearHigherBoundValid = (
    yearLowerBound: number | null | undefined,
    yearHigherBound: number | null | undefined,
  ) => {
    if (yearHigherBound == null || yearHigherBound == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(yearHigherBound.toString()) &&
      this.isNumberAnInteger(yearHigherBound) &&
      (this.isYearLowerBoundValid(yearLowerBound)
        ? yearLowerBound <= yearHigherBound
        : true)
    );
  };

  isMileageLowerBoundValid = (mileageLowerBound: number | null | undefined) => {
    if (mileageLowerBound == null || mileageLowerBound == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(mileageLowerBound.toString()) &&
      this.isNumberAnInteger(mileageLowerBound)
    );
  };

  isMileageHigherBoundValid = (
    mileageLowerBound: number | null | undefined,
    mileageHigherBound: number | null | undefined,
  ) => {
    if (mileageHigherBound == null || mileageHigherBound == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(mileageHigherBound.toString()) &&
      this.isNumberAnInteger(mileageHigherBound) &&
      (this.isMileageLowerBoundValid(mileageLowerBound)
        ? mileageLowerBound <= mileageHigherBound
        : true)
    );
  };

  isPriceLowerBoundValid = (priceLowerBound: number | null | undefined) => {
    if (priceLowerBound == null || priceLowerBound == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(priceLowerBound.toString()) &&
      this.isNumberAnInteger(priceLowerBound)
    );
  };

  isPriceHigherBoundValid = (
    priceLowerBound: number | null | undefined,
    priceHigherBound: number | null | undefined,
  ) => {
    if (priceHigherBound == null || priceHigherBound == undefined) {
      return false;
    }
    return (
      this.isFieldNotEmpty(priceHigherBound.toString()) &&
      this.isNumberAnInteger(priceHigherBound) &&
      (this.isPriceLowerBoundValid(priceLowerBound)
        ? priceLowerBound < priceHigherBound
        : true)
    );
  };

  yearLowerBoundError = (yearLowerBound: number | null | undefined) => {
    if (
      yearLowerBound == null ||
      yearLowerBound == undefined ||
      !this.isFieldNotEmpty(yearLowerBound.toString())
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.emptyError;
    } else if (!this.isNumberAnInteger(yearLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.numberNotIntegerError;
    }
  };

  yearHigherBoundError = (
    yearLowerBound: number | null | undefined,
    yearHigherBound: number | null | undefined,
  ) => {
    if (yearHigherBound == null || yearHigherBound == undefined) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.emptyError;
    } else if (!this.isFieldNotEmpty(yearHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(yearHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.numberNotIntegerError;
    } else if (
      this.isYearLowerBoundValid(yearLowerBound) &&
      !(yearLowerBound <= yearHigherBound)
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.yearLowerBoundHigherThanYearHigherBoundError;
    }
  };

  mileageLowerBoundError = (mileageLowerBound: number | null | undefined) => {
    if (mileageLowerBound == null || mileageLowerBound == undefined) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.emptyError;
    } else if (!this.isFieldNotEmpty(mileageLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.emptyError;
    } else if (!this.isNumberAnInteger(mileageLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.numberNotIntegerError;
    }
  };

  mileageHigherBoundError = (
    mileageLowerBound: number | null | undefined,
    mileageHigherBound: number | null | undefined,
  ) => {
    if (mileageHigherBound == null || mileageHigherBound == undefined) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.emptyError;
    } else if (!this.isFieldNotEmpty(mileageHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(mileageHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.numberNotIntegerError;
    } else if (
      this.isMileageLowerBoundValid(mileageLowerBound) &&
      !(mileageLowerBound <= mileageHigherBound)
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.mileageLowerBoundHigherThanMileageHigherBoundError;
    }
  };

  priceLowerBoundError = (priceLowerBound: number | null | undefined) => {
    if (priceLowerBound == null || priceLowerBound == undefined) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.emptyError;
    } else if (!this.isFieldNotEmpty(priceLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.emptyError;
    } else if (!this.isNumberAnInteger(priceLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.numberNotIntegerError;
    }
  };

  priceHigherrBoundError = (
    priceLowerBound: number | null | undefined,
    priceHigherBound: number | null | undefined,
  ) => {
    if (priceHigherBound == null || priceHigherBound == undefined) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.emptyError;
    } else if (!this.isFieldNotEmpty(priceHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(priceHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.numberNotIntegerError;
    } else if (
      this.isPriceLowerBoundValid(priceLowerBound) &&
      !(priceLowerBound < priceHigherBound)
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.priceLowerBoundHigherThanPriceHigherBoundError;
    }
  };
}

export default CreateAdFormValidation;
