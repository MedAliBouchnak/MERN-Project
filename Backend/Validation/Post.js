const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidatePost(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  data.img = !isEmpty(data.img) ? data.img : "";
  if (validator.isEmpty(data.title)) {
    errors.title = "Required title";
  }
  if (validator.isEmpty(data.img)) {
    errors.img = "Required an Image";
  }
  if (validator.isEmpty(data.message)) {
    errors.message = "Required a Message";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
