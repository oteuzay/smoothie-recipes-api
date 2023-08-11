const User = require("../models/user");

const createError = require("http-errors");

exports.signup = async (req, res, next) => {
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

exports.signin = async (req, res, next) => {
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

    res.json({
      message: "User successfully signed in.",
      user: {
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError.BadRequest();
    }

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

    res.json({
      message: "Access token successfully refreshed.",
    });
  } catch (error) {
    next(error);
  }
};
