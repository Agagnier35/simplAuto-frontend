import BasicFormValidation from '../BasicFormValidation';
class CreateAdFormValidation extends BasicFormValidation {
  general: any;
  constructor(general: any) {
    super();
    this.general = general;
  }

  isYearLowerBoundValid = (yearLowerBound: number) => {
    // Supérieur ou égal à 0
    // Ne peut pas être inférieur à yearHigherBound
    // Ne peut pas être un chiffre décimal
    // Année minimum? genre 1970
    return this.isFieldNotEmpty(yearLowerBound.toString());
  };

  isYearHigherBoundValid = (yearHigherBound: number) => {
    // Supérieur ou égal à 0
    // Ne peut pas être supérieur à l'année actuelle
    // Ne peut pas être inférieur à yearLowerBound
    return this.isFieldNotEmpty(yearHigherBound.toString());
  };

  isMileageLowerBoundValid = (mileageLowerBound: number) => {
    // Supérieur ou égal à 0
    return this.isFieldNotEmpty(mileageLowerBound.toString());
  };

  isMileageHigherBoundValid = (mileageHigherBound: number) => {
    // Supérieur ou égal à 0
    return this.isFieldNotEmpty(mileageHigherBound.toString());
  };

  isPriceLowerBoundValid = (priceLowerBound: number) => {
    // Supérieur ou égal à 0
    return this.isFieldNotEmpty(priceLowerBound.toString());
  };

  isPriceHigherrBoundValid = (priceHigherBound: number) => {
    // Supérieur ou égal à 0
    return this.isFieldNotEmpty(priceHigherBound.toString());
  };

  yearLowerBoundValidError = () => {};

  yearHigherBoundValidError = () => {};

  mileageLowerBoundValidError = () => {};

  mileageHigherBoundValid = () => {};

  priceLowerBoundValidError = () => {};

  priceHigherrBoundValidError = () => {};
}

export default CreateAdFormValidation;
