const authService = require("../services/auth.service");

exports.signUp = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const createdUser = await authService.singUp(user);

    res.status(201).json({
      message: "User successfully signed up.",
      user: {
        email: createdUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const tokens = await authService.singIn(user);

    res.json({
      message: "User successfully signed in.",
      user: {
        email: user.email,
      },
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signOut = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    await authService.signOut(refreshToken);

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

    const tokens = await authService.refreshToken(refreshToken);

    res.json({
      message: "Access token successfully refreshed.",
      tokens: {
        accessToken: tokens.newAccessToken,
        refreshToken: tokens.newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
