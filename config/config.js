require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/smoothie-recipes",
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "*",
  NODE_ENV: process.env.NODE_ENV || "Development",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
