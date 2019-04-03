class BasicFormValidation {
  isFieldNotEmpty = (field: string | undefined) => {
    return field !== '';
  };

  doesFieldNotContainNumber = (field: string | undefined) => {
    return field && !/\d/.test(field);
  };

  isFieldNumber = (field: string | undefined) => {
    return !isNaN(Number(field));
  };

  isNumberAnInteger = (number: number) => {
    return Number.isInteger(number);
  };

  isEmailFormatValid = (email: string | undefined) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && re.test(String(email).toLowerCase());
  };

  doPasswordsMatch = (
    password: string | undefined,
    confirmPassword: string | undefined,
  ) => {
    return password === confirmPassword;
  };
}

export default BasicFormValidation;
