const swaggerJSDoc = require("swagger-jsdoc");

const package = require("../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: package.name,
      version: package.version,
      description: package.description,
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

module.exports = swaggerJSDoc(options);
