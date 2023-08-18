require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB: process.env.DB,
  SECRET: process.env.SECRET,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN | "*",
  NODE_ENV: process.env.NODE_ENV || "Development",
  LOCALE: process.env.LOCALE,
};
