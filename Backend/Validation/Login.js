const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.password = "Required Email";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format E-mail";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required Password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
