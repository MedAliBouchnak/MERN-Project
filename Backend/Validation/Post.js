const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidatePost(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.City = !isEmpty(data.message) ? data.message : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Required title";
  }
  if (validator.isEmpty(data.message)) {
    errors.message = "Required a Message";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
