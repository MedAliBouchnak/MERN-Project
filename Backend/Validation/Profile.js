const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};
  data.PhoneNum = !isEmpty(data.PhoneNum) ? data.PhoneNum : "";
  data.City = !isEmpty(data.City) ? data.City : "";
  data.Country = !isEmpty(data.Country) ? data.Country : "";
  data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : "";
  data.Address = !isEmpty(data.Address) ? data.Address : "";

  if (validator.isEmpty(data.PhoneNum)) {
    errors.PhoneNum = "Required Phone Number";
  }
  if (validator.isEmpty(data.City)) {
    errors.City = "Required City";
  }

  if (validator.isEmpty(data.Country)) {
    errors.Country = "Required Country";
  }

  if (validator.isEmpty(data.postalCode)) {
    errors.postalCode = "Required a Postal Code";
  }
  if (validator.isEmpty(data.Address)) {
    errors.Address = "Required an Address";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
