const jsonwebtoken = require("jsonwebtoken");

const createError = require("http-errors");

const client = require("./redis");

client.connect();

const config = require("../config/config");

exports.signAccessToken = async (userID) => {
  const options = {
    expiresIn: "4m",
    issuer: "oteuzay.github.io",
    audience: userID,
  };

  try {
    return jsonwebtoken.sign({}, config.ACCESS_TOKEN_SECRET, options);
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

  const secret = config.REFRESH_TOKEN_SECRET;

  try {
    const token = jsonwebtoken.sign({}, secret, options);

    await client.SET(userID, token, "EX", 365 * 24 * 60 * 60);

    return token;
  } catch (error) {
    throw error;
  }
};

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw createError.Unauthorized();
    }

    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    const payload = await jsonwebtoken.verify(
      token,
      config.ACCESS_TOKEN_SECRET
    );

    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};

exports.verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await jsonwebtoken.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET
    );

    const userID = payload.aud;

    const result = await client.GET(userID);

    if (refreshToken === result) {
      return userID;
    } else {
      throw createError.Unauthorized();
    }
  } catch (error) {
    throw error;
  }
};
