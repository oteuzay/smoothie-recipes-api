const { body } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

exports.signUp = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit."),
  validationCheck,
];

exports.signIn = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit."),
  validationCheck,
];

exports.signOut = [
  body("refreshToken")
    .trim()
    .notEmpty()
    .withMessage("Refresh token cannot be empty."),
  validationCheck,
];

exports.refreshToken = [
  body("refreshToken")
    .trim()
    .notEmpty()
    .withMessage("Refresh token cannot be empty."),
  validationCheck,
];
