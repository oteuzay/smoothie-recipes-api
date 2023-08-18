const jsonwebtoken = require("jsonwebtoken");

const createError = require("http-errors");

const cacheClient = require("../cache/index").connect();

const authConfig = require("../config/auth.config");

exports.signAccessToken = async (userID) => {
  const options = {
    expiresIn: "15m",
    issuer: "oteuzay.github.io",
    audience: userID,
  };

  const accessTokenSecret = authConfig.ACCESS_TOKEN_SECRET;

  try {
    return jsonwebtoken.sign({}, accessTokenSecret, options);
  } catch (error) {
    console.log(error.message);
    throw createError.InternalServerError();
  }
};

exports.signRefreshToken = async (userID) => {
  const options = {
    expiresIn: "1y",
    issuer: "oteuzay.github.io",
    audience: userID,
  };

  const refreshTokenSecret = authConfig.REFRESH_TOKEN_SECRET;

  try {
    const token = jsonwebtoken.sign({}, refreshTokenSecret, options);

    await cacheClient.SET(userID, token);
    await cacheClient.expire(userID, 365 * 24 * 60 * 60);

    return token;
  } catch (error) {
    throw error;
  }
};

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["Authorization"];

    if (!authHeader) {
      throw createError.Unauthorized();
    }

    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    const accessTokenSecret = authConfig.ACCESS_TOKEN_SECRET;

    const payload = await jsonwebtoken.verify(token, accessTokenSecret);

    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};

exports.verifyRefreshToken = async (refreshToken) => {
  try {
    const refreshTokenSecret = authConfig.REFRESH_TOKEN_SECRET;

    const payload = await jsonwebtoken.verify(refreshToken, refreshTokenSecret);

    const userID = payload.aud;

    const result = await cacheClient.GET(userID);

    if (refreshToken === result) {
      return userID;
    } else {
      throw createError.Unauthorized();
    }
  } catch (error) {
    throw error;
  }
};
