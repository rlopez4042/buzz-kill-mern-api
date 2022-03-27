const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    user.save()
      .then(user => {
        res.json({
          message: "User added.",
        });
      })
      .catch(error => {
        res.json({ message: "Error occured." });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({$or: [{ email: username },{email: username}]}).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, "secretValue", {
            expiresIn: '1h',
          });
          res.json({
            message: "Login Successful",
            token
          });
        } else {
          res.json({
            message: "Incorrect Password",
          });
        }
      });
    } else {
      res.json({
        message: "No user found.",
      });
    }
  });
};

module.exports = { register, login };
