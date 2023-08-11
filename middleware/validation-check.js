const { validationResult } = require("express-validator");

/* The code is exporting a middleware function that is used to validate the request using the
express-validator library. */
module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
