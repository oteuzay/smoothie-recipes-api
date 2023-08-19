const router = require("express").Router();

const config = require("../config/api.config");

const swaggerUI = require("swagger-ui-express");
const { swaggerSpec } = require("../utils/swagger.util");

if (config.NODE_ENV === "Development") {
  router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = router;
