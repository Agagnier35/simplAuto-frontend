import BasicFormValidation from '../BasicFormValidation';

export const MAXMILEAGEALLOWED: number = 1000000;
export const MINCARYEAR: number = 1900;

class CreateAdFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearLowerBoundValid = (yearLowerBound: number | null | undefined) => {
    if (!yearLowerBound) {
      return true;
    }
    return (
      yearLowerBound >= MINCARYEAR &&
      yearLowerBound < new Date().getFullYear() &&
      this.isFieldNotEmpty(yearLowerBound.toString()) &&
      this.isNumberAnInteger(yearLowerBound)
    );
  };

  isYearHigherBoundValid = (
    yearLowerBound: number | null | undefined,
    yearHigherBound: number | null | undefined,
  ) => {
    if (!yearHigherBound) {
      return true;
    }
    return (
      this.isFieldNotEmpty(yearHigherBound.toString()) &&
      this.isNumberAnInteger(yearHigherBound) &&
      yearHigherBound >= MINCARYEAR &&
      yearHigherBound < new Date().getFullYear() &&
      (this.isYearLowerBoundValid(yearLowerBound) && yearLowerBound
        ? yearLowerBound <= yearHigherBound
        : true)
    );
  };

  isMileageLowerBoundValid = (mileageLowerBound: number | null | undefined) => {
    if (!mileageLowerBound) {
      return true;
    }
    return (
      mileageLowerBound >= 0 &&
      mileageLowerBound <= MAXMILEAGEALLOWED &&
      this.isFieldNotEmpty(mileageLowerBound.toString()) &&
      this.isNumberAnInteger(mileageLowerBound)
    );
  };

  isMileageHigherBoundValid = (
    mileageLowerBound: number | null | undefined,
    mileageHigherBound: number | null | undefined,
  ) => {
    if (!mileageHigherBound) {
      return true;
    }
    return (
      this.isFieldNotEmpty(mileageHigherBound.toString()) &&
      this.isNumberAnInteger(mileageHigherBound) &&
      mileageHigherBound >= 0 &&
      mileageHigherBound <= 1000000 &&
      (this.isMileageLowerBoundValid(mileageLowerBound) && mileageLowerBound
        ? mileageLowerBound <= mileageHigherBound
        : true)
    );
  };

  isPriceLowerBoundValid = (priceLowerBound: number | null | undefined) => {
    if (!priceLowerBound) {
      return true;
    }
    return (
      priceLowerBound >= 0 &&
      this.isFieldNotEmpty(priceLowerBound.toString()) &&
      this.isNumberAnInteger(priceLowerBound)
    );
  };

  isPriceHigherBoundValid = (
    priceLowerBound: number | null | undefined,
    priceHigherBound: number | null | undefined,
  ) => {
    if (!priceHigherBound) {
      return true;
    }
    return (
      this.isFieldNotEmpty(priceHigherBound.toString()) &&
      this.isNumberAnInteger(priceHigherBound) &&
      (this.isPriceLowerBoundValid(priceLowerBound) && priceLowerBound
        ? priceLowerBound < priceHigherBound
        : true)
    );
  };

  yearLowerBoundError = (yearLowerBound: number | null | undefined) => {
    if (!yearLowerBound || !this.isFieldNotEmpty(yearLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.emptyError;
    } else if (yearLowerBound < MINCARYEAR) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.yearLowerBoundTooLow;
    } else if (yearLowerBound > new Date().getFullYear()) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.yearLowerBoundTooHigh;
    } else if (!this.isNumberAnInteger(yearLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearLowerBound.numberNotIntegerError;
    }
  };

  yearHigherBoundError = (
    yearLowerBound: number | null | undefined,
    yearHigherBound: number | null | undefined,
  ) => {
    if (!yearHigherBound) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.emptyError;
    } else if (!this.isFieldNotEmpty(yearHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(yearHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.numberNotIntegerError;
    } else if (yearHigherBound < MINCARYEAR) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.yearHigherBoundTooLow;
    } else if (yearHigherBound > new Date().getFullYear()) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.yearHigherBoundTooHigh;
    } else if (
      this.isYearLowerBoundValid(yearLowerBound) &&
      yearLowerBound &&
      !(yearLowerBound <= yearHigherBound)
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .yearHigherBound.yearLowerBoundHigherThanYearHigherBoundError;
    }
  };

  mileageLowerBoundError = (mileageLowerBound: number | null | undefined) => {
    if (!mileageLowerBound) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.emptyError;
    } else if (!this.isFieldNotEmpty(mileageLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.emptyError;
    } else if (mileageLowerBound < 0) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.mileageLowerBoundTooLow;
    } else if (mileageLowerBound > MAXMILEAGEALLOWED) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.mileageLowerBoundTooHigh;
    } else if (!this.isNumberAnInteger(mileageLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageLowerBound.numberNotIntegerError;
    }
  };

  mileageHigherBoundError = (
    mileageLowerBound: number | null | undefined,
    mileageHigherBound: number | null | undefined,
  ) => {
    if (!mileageHigherBound) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.emptyError;
    } else if (!this.isFieldNotEmpty(mileageHigherBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.emptyError;
    } else if (!this.isNumberAnInteger(mileageHigherBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.numberNotIntegerError;
    } else if (mileageHigherBound < 0) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.mileageHigherBoundTooLow;
    } else if (mileageHigherBound > MAXMILEAGEALLOWED) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.mileageHigherBoundTooHigh;
    } else if (
      this.isMileageLowerBoundValid(mileageLowerBound) &&
      mileageLowerBound &&
      !(mileageLowerBound <= mileageHigherBound)
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .mileageHigherBound.mileageLowerBoundHigherThanMileageHigherBoundError;
    }
  };

  priceLowerBoundError = (priceLowerBound: number | null | undefined) => {
    if (!priceLowerBound) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.emptyError;
    } else if (!this.isFieldNotEmpty(priceLowerBound.toString())) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.emptyError;
    } else if (priceLowerBound < 0) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.priceLowerBoundTooLowError;
    } else if (!this.isNumberAnInteger(priceLowerBound)) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceLowerBound.numberNotIntegerError;
    }
  };

  priceHigherrBoundError = (
    priceLowerBound: number | null | undefined,
    priceHigherBound: number | null | undefined,
  ) => {
    if (!priceHigherBound) {
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
      priceLowerBound &&
      !(priceLowerBound < priceHigherBound)
    ) {
      return this.general.formFieldsErrors.createAdFormFieldsErrors
        .priceHigherBound.priceLowerBoundHigherThanPriceHigherBoundError;
    }
  };

  isCreateAdFormStateValid = (state: any) => {
    return (
      state.manufacturerID != null &&
      state.modelID != null &&
      state.categoryID != null &&
      this.isYearLowerBoundValid(state.yearLowerBound) &&
      this.isYearHigherBoundValid(
        state.yearLowerBound,
        state.yearHigherBound,
      ) &&
      this.isMileageLowerBoundValid(state.mileageLowerBound) &&
      this.isMileageHigherBoundValid(
        state.mileageLowerBound,
        state.mileageHigherBound,
      ) &&
      this.isPriceLowerBoundValid(state.priceLowerBound) &&
      this.isPriceHigherBoundValid(
        state.priceLowerBound,
        state.priceHigherBound,
      )
    );
  };
}

export default CreateAdFormValidation;
