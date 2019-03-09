class BasicFormValidation {
  isFieldNotEmpty = (field: string) => {
    return !(field == '');
  };

  doesFieldNotContainNumber = (field: string) => {
    return !/\d/.test(field);
  };

  isEmailFormatValid = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  doPasswordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
}

export default BasicFormValidation;
