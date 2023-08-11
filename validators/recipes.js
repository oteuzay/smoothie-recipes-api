const { body, check } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

exports.getRecipes = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer and greater than or equal to 1."
    ),
  validationCheck,
];

exports.getRecipe = [
  check("id")
    .isMongoId()
    .withMessage("The ID should be a valid MongoDB ObjectID."),
  validationCheck,
];

exports.createRecipe = [
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("At least one ingredient is required."),
  body("ingredients.*.name")
    .trim()
    .notEmpty()
    .withMessage("Ingredient name is required."),
  body("ingredients.*.amount")
    .trim()
    .notEmpty()
    .withMessage("Ingredient amount is required."),
  validationCheck,
];

exports.updateRecipe = [
  check("id")
    .isMongoId()
    .withMessage("The ID should be a valid MongoDB ObjectID."),
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("At least one ingredient is required."),
  body("ingredients.*.name")
    .trim()
    .notEmpty()
    .withMessage("Ingredient name is required."),
  body("ingredients.*.amount")
    .trim()
    .notEmpty()
    .withMessage("Ingredient amount is required."),
  validationCheck,
];

exports.deleteRecipe = [
  check("id")
    .isMongoId()
    .withMessage("The ID should be a valid MongoDB ObjectID."),
  validationCheck,
];
