const userRepository = require("../repositories/user.repository");
const auth = require("../utils/auth.util");

const createError = require("http-errors");

class AuthService {
  async singUp(user) {
    const existingUser = await userRepository.getUserByEmail(user.email);

    if (existingUser) {
      throw createError.UnprocessableEntity("E-Mail address already exists!");
    }

    const createdUser = await userRepository.createUser(user);

    return createdUser;
  }

  async singIn(user) {
    const existingUser = await userRepository.getUserByEmail(user.email);

    if (!existingUser) {
      throw createError.NotFound("User not found.");
    }

    const isMatch = await existingUser.isValidPassword(user.password);

    if (!isMatch) {
      throw createError.Unauthorized("Invalid email or password.");
    }

    const accessToken = await auth.signAccessToken(existingUser.id);
    const refreshToken = await auth.signRefreshToken(existingUser.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signOut(refreshToken) {
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userID = await auth.verifyRefreshToken(refreshToken);

    await auth.deleteRefreshToken(userID);
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userID = await auth.verifyRefreshToken(refreshToken);

    const newAccessToken = await auth.signAccessToken(userID);
    const newRefreshToken = await auth.signRefreshToken(userID);

    console.log(newAccessToken, newRefreshToken);

    return {
      newAccessToken,
      newRefreshToken,
    };
  }
}

module.exports = new AuthService();
