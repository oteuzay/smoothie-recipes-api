const swaggerJSDoc = require("swagger-jsdoc");

const swaggerConfig = require("../config/swagger.config");

/* The `options` object is used to configure the Swagger documentation generation. */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: swaggerConfig.TITLE,
      description: swaggerConfig.DESCRIPTION,
      version: swaggerConfig.VERSION,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

exports.swaggerSpec = swaggerJSDoc(options);
