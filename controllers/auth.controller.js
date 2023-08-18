const User = require("../models/user");

const createError = require("http-errors");

const auth = require("../helpers/auth");
const client = require("../helpers/redis");

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExisting = await User.findOne({ email: email });

    if (userExisting) {
      throw createError.Conflict();
    }

    await new User({
      email,
      password,
    }).save();

    res.status(201).json({
      message: "User successfully signed up.",
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw createError.NotFound();
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      throw createError.Unauthorized();
    }

    // TODO: Generating tokens.
    const accessToken = await auth.signAccessToken(user.id);
    const refreshToken = await auth.signRefreshToken(user.id);

    res.json({
      message: "User successfully signed in.",
      user: {
        email: email,
      },
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signOut = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userID = await auth.verifyRefreshToken(refreshToken);

    await client.DEL(userID);

    res.json({
      message: "User successfully signed out.",
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userID = await auth.verifyRefreshToken(refreshToken);

    res.json({
      message: "Access token successfully refreshed.",
      token: {
        accessToken: await auth.signAccessToken(userID),
        refreshToken: await auth.signRefreshToken(userID),
      },
    });
  } catch (error) {
    next(error);
  }
};
