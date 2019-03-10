import BasicFormValidation from '../BasicFormValidation';
class CreateAdFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearLowerBoundValid = (yearLowerBound: number) => {
    // Ne peut pas être supérieur à yearHigherBound
    // Ne peut pas être un chiffre décimal
    // Ne peut être en dessous d'une année minimum : exemple 1980
    return (
      this.isFieldNotEmpty(yearLowerBound.toString()) &&
      this.isNumberAnInteger(yearLowerBound)
    );
  };

  isYearHigherBoundValid = (
    yearLowerBound: number,
    yearHigherBound: number,
  ) => {
    // Ne peut pas être supérieur à l'année actuelle
    // Ne peut pas être inférieur à yearLowerBound
    // Ne peut pas être être un chiffre décimal
    // Implique que la première year doit être valide
    return (
      this.isFieldNotEmpty(yearHigherBound.toString()) &&
      this.isNumberAnInteger(yearLowerBound) &&
      yearLowerBound <= yearHigherBound
    );
  };

  isMileageLowerBoundValid = (mileageLowerBound: number) => {
    // Supérieur ou égal à 0
    // Ne peut pas être supérieur à mileageHigherBound
    // Ne peut pas être un chiffre décimal
    return (
      this.isFieldNotEmpty(mileageLowerBound.toString()) &&
      this.isNumberAnInteger(mileageLowerBound)
    );
  };

  isMileageHigherBoundValid = (
    mileageLowerBound: number,
    mileageHigherBound: number,
  ) => {
    // Ne peut pas être inférieur à mileageLowerbound
    // Ne peut pas être un chiffre décimal
    // Ne peut pas être supérieur à un certain chiffre : exemple 300 000km
    return (
      this.isFieldNotEmpty(mileageHigherBound.toString()) &&
      this.isNumberAnInteger(mileageHigherBound) &&
      mileageLowerBound <= mileageHigherBound
    );
  };

  isPriceLowerBoundValid = (priceLowerBound: number) => {
    // Supérieur ou égal à 0
    // Ne peut pas être un chiffre décimal (les cennes sont irrelevant)
    // Ne peut pas être supérieur à priceHigherBound
    return (
      this.isFieldNotEmpty(priceLowerBound.toString()) &&
      this.isNumberAnInteger(priceLowerBound)
    );
  };

  isPriceHigherBoundValid = (
    priceLowerBound: number,
    priceHigherBound: number,
  ) => {
    // Ne peut pas être inférieur à priceHigherBound
    // Ne peut pas être un chiffre décimal
    return (
      this.isFieldNotEmpty(priceHigherBound.toString()) &&
      this.isNumberAnInteger(priceHigherBound) &&
      priceLowerBound < priceHigherBound
    );
  };

  yearLowerBoundValidError = () => {};

  yearHigherBoundValidError = () => {};

  mileageLowerBoundValidError = () => {};

  mileageHigherBoundValid = () => {};

  priceLowerBoundValidError = () => {};

  priceHigherrBoundValidError = () => {};
}

export default CreateAdFormValidation;
