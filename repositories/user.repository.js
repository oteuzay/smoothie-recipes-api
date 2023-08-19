const User = require("../models/user.model");

class UserRepository {
  async createUser(user) {
    return await User.create(user);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email: email });
  }

  async addRecipeToUser(recipeID, userID) {
    await User.findByIdAndUpdate(userID, {
      $push: { recipes: recipeID },
    });
  }
  async removeRecipeFromUser(recipeID, userID) {
    await User.findByIdAndUpdate(userID, {
      $pull: { recipes: recipeID },
    });
  }
}

module.exports = new UserRepository();
