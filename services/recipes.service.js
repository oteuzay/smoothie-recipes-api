const recipesRepository = require("../repositories/recipes.repository");
const userRepository = require("../repositories/user.repository");

const createError = require("http-errors");

class RecipesService {
  async getRecipes(currentPage, perPage) {
    return recipesRepository.getRecipes(currentPage, perPage);
  }

  async countRecipes() {
    return recipesRepository.countRecipes();
  }

  async getRecipe(recipeID) {
    const recipe = await recipesRepository.getRecipeById(recipeID);

    if (!recipe) {
      throw createError.NotFound("Recipe could not be found.");
    }

    return recipe;
  }

  async createRecipe(recipe) {
    const createdRecipe = await recipesRepository.createRecipe(recipe);

    await userRepository.addRecipeToUser(
      createdRecipe._id,
      createdRecipe.userID
    );

    return createdRecipe;
  }

  async updateRecipe(recipeID, recipe) {
    const existingRecipe = await recipesRepository.getRecipeById(recipeID);

    if (!existingRecipe) {
      throw createError.NotFound("Recipe could not be found.");
    }

    if (existingRecipe.userID._id.toString() !== recipe.userID) {
      throw createError.Conflict(
        "You do not have permission to perform this action."
      );
    }

    for (const field in recipe) {
      existingRecipe[field] = recipe[field];
    }

    const updatedRecipe = await recipesRepository.updateRecipe(existingRecipe);

    return updatedRecipe;
  }

  async deleteRecipe(recipeID, userID) {
    const recipe = await recipesRepository.getRecipeById(recipeID);

    if (!recipe) {
      throw createError.NotFound("Recipe could not be found.");
    }

    if (recipe.userID._id.toString() !== userID) {
      throw createError.Conflict(
        "You do not have permission to perform this action."
      );
    }

    await recipesRepository.deleteRecipe(recipeID);
    await userRepository.removeRecipeFromUser(recipe._id, userID);
  }
}

module.exports = new RecipesService();
