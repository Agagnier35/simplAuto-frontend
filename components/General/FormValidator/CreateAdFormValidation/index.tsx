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
      return 'p';
    } else if (!this.isNumberAnInteger(yearLowerBound)) {
      return 'abc';
    }
  };

  yearHigherBoundError = (yearLowerBound: number, yearHigherBound: number) => {
    if (!this.isFieldNotEmpty(yearHigherBound.toString())) {
      return 'p';
    } else if (!this.isNumberAnInteger(yearLowerBound)) {
      return 'abd';
    } else if (!(yearLowerBound <= yearHigherBound)) {
      return 'k';
    }
  };

  mileageLowerBoundError = (mileageLowerBound: number) => {
    if (!this.isFieldNotEmpty(mileageLowerBound.toString())) {
      return 'a';
    } else if (!this.isNumberAnInteger(mileageLowerBound)) {
      return 'a';
    }
  };

  mileageHigherBoundError = (
    mileageLowerBound: number,
    mileageHigherBound: number,
  ) => {
    if (!this.isFieldNotEmpty(mileageHigherBound.toString())) {
      return 'a';
    } else if (!this.isNumberAnInteger(mileageHigherBound)) {
      return 'a';
    } else if (!(mileageLowerBound <= mileageHigherBound)) {
      return 'a';
    }
  };

  priceLowerBoundError = (priceLowerBound: number) => {
    if (!this.isFieldNotEmpty(priceLowerBound.toString())) {
      return 'a';
    } else if (!this.isNumberAnInteger(priceLowerBound)) {
      return 'a';
    }
  };

  priceHigherrBoundError = (
    priceLowerBound: number,
    priceHigherBound: number,
  ) => {
    if (!this.isFieldNotEmpty(priceHigherBound.toString())) {
      return 'a';
    } else if (!this.isNumberAnInteger(priceHigherBound)) {
      return 'a';
    } else if (!(priceLowerBound < priceHigherBound)) {
      return 'a';
    }
  };
}

export default CreateAdFormValidation;
