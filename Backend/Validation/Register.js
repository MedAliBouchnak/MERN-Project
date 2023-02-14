const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Required Name";
  }
  if (validator.isEmpty(data.email)) {
    errors.password = "Required Email";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format E-mail";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required Password";
  }
  if (!validator.equals(data.password, data.confirm)) {
    errors.confirm = "Passwords does not matches";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Required Confirm";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
