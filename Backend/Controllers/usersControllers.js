const UserModel = require("../Models/usersModel");
const ValidateRegister = require("../Validation/Register");
const ValidateLogin = require("../Validation/Login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      //Check if the mail exist in the Database
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "User does exist";
          res.status(404).json(errors);
        } else {
          //Hide the password by haching it
          const hash = bcrypt.hashSync(req.body.password, 10);
          req.body.password = hash;
          req.body.role = "USER";
          await UserModel.create(req.body);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = "Not Found User";
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = "Incorrect password";
              res.status(404).json(errors);
            } else {
              var token = jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                },
                process.env.PRIVATE_KEY,
                { expiresIn: "2h" }
              );
              res.status(200).json({ message: "Success", token:"Bearer "+ token });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const User = async (req, res) => {
  res.send("Welcome User");
};
const Admin = async (req, res) => {
  res.send("Welcome Admin");
};
module.exports = {
  Register,
  Login,
  User,
  Admin,
};
