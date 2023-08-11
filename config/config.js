require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/smoothie-recipes",
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "*",
  NODE_ENV: process.env.NODE_ENV || "Development",
};
