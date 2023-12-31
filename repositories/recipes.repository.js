const Recipe = require("../models/recipe.model");

class RecipesRepository {
  async createRecipe(recipe) {
    return Recipe.create(recipe);
  }

  async countRecipes() {
    return Recipe.find().countDocuments();
  }

  async getRecipes(currentPage, perPage) {
    return Recipe.find()
      .populate("userID")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  }

  async getRecipeById(recipeID) {
    return Recipe.findById(recipeID).populate("userID");
  }

  async updateRecipe(recipe) {
    return recipe.save();
  }

  async deleteRecipe(recipeID) {
    return Recipe.findByIdAndDelete(recipeID);
  }
}

module.exports = new RecipesRepository();
