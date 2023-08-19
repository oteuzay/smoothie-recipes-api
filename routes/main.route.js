const router = require("express").Router();

const authRoute = require("./auth.route");
const recipesRoute = require("./recipes.route");
const swaggerRoute = require("./swagger.route");

router.use("/auth", authRoute);
router.use("/recipes", recipesRoute);
router.use("/api-docs", swaggerRoute);

module.exports = router;
