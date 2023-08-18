/* These lines of code are importing the `express` and `mongoose` modules in JavaScript. */
const express = require("express");
const mongoose = require("mongoose");

/* These lines of code are importing middleware functions that enhance the functionality and security
of the Express application. */
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

/* The line is importing the `http-errors` module. */
const createError = require("http-errors");

/*
 * Configs
 */
const apiConfig = require("./config/api.config");
const databaseConfig = require("./config/database.config");

/*
 *  Routes
 */
const mainRoute = require("./routes/main.route");

/* Creating an instance of the Express application. */
const app = express();

/* `morgan("combined")` is a middleware function that logs HTTP requests and responses in the
console. The "combined" parameter specifies the log format, which includes the standard Apache
combined log output. This log format includes information such as the remote IP address, request
method, URL, response status code, response size, and response time. It is useful for debugging and
monitoring the application's HTTP traffic. */
app.use(morgan("combined"));

/* The statement is enabling Cross-Origin Resource Sharing (CORS) for the Express application. */
app.use(
  cors({
    origin: apiConfig.ALLOWED_ORIGIN,
  })
);

/* `helmet()` is a middleware function that adds various HTTP headers to enhance the security
of the Express application. It helps protect the application from common security vulnerabilities
such as cross-site scripting (XSS), clickjacking, and other attacks. Helmet sets HTTP headers like
Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, and X-XSS-Protection, among
others, to provide an additional layer of security. */
app.use(helmet());

/* `express.json()` is a middleware function that parses incoming requests with JSON
payloads. It allows the Express application to handle JSON data sent in the request body. */
app.use(express.json());

/* The `compression()` statement is enabling compression middleware in the Express application. */
app.use(compression());

/*
 *  Routes
 */
app.use("/", mainRoute);

/* The code is a middleware function that is used to handle requests for routes that are not found. */
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

/* The code block is a middleware function that handles errors in the Express application. */
app.use((error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";

  res.status(errorStatus).json({
    message: errorMessage,
  });
});

/* The code block is establishing a connection to a MongoDB database using Mongoose. */
mongoose
  .connect(databaseConfig.DB_URI, {})
  .then(() => {
    /* Starting the Express application and listening for incoming requests on the specified port. */
    app.listen(apiConfig.PORT, () => {
      console.log(`Server is running on port ${apiConfig.PORT}.`);
    });
  })
  .catch((err) => console.error(err));
