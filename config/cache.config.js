require("dotenv").config();

/* The code is exporting an object with two properties: `HOST` and `PORT`. */
module.exports = {
  HOST: process.env.CACHE_HOST,
  PORT: process.env.CACHE_PORT,
};
