const recipesService = require("../services/recipes.service");

/* The `getRecipes` function is responsible for retrieving a list of recipes. */
exports.getRecipes = async (req, res, next) => {
  const currentPage = parseInt(req.query.page || 1);
  const perPage = 10;

  try {
    const countRecipes = await recipesService.countRecipes();
    const recipes = await recipesService.getRecipes(currentPage, perPage);

    res.status(200).json({
      recipes: recipes.map((recipe) => recipe.toJSON()),
      pagination: {
        currentPage: currentPage,
        lastPage: Math.ceil(countRecipes / perPage),
        countNews: countRecipes,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* The `getRecipe` function is responsible for retrieving a specific recipe by its ID. */
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await recipesService.getRecipe(req.params.id);

    res.status(200).json({
      recipe: recipe.toJSONForDetail(),
    });
  } catch (err) {
    next(err);
  }
};

/* The `createRecipe` function is responsible for creating a new recipe. */
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = {
      title: req.body.title,
      recipe: { ingredients: req.body.ingredients },
      userID: req.payload.aud,
    };

    const createdRecipe = await recipesService.createRecipe(recipe);

    res.json({
      message: "Recipe successfully created.",
      recipe: createdRecipe.toJSONForDetail(),
    });
  } catch (error) {
    next(error);
  }
};

/* The `updateRecipe` function is responsible for updating a recipe item. */
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipeID = req.params.id;

    const recipe = {
      title: req.body.title,
      recipe: { ingredients: req.body.ingredients },
      userID: req.payload.aud,
    };

    const updatedRecipe = await recipesService.updateRecipe(recipeID, recipe);

    res.json({
      message: "Recipe successfully updated.",
      recipe: updatedRecipe.toJSONForDetail(),
    });
  } catch (error) {
    next(error);
  }
};

/* The `deleteRecipe` function is responsible for deleting a recipe. */
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipeID = req.params.id;
    const userID = req.payload.aud;

    await recipesService.deleteRecipe(recipeID, userID);

    res.json({
      message: "Recipe successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};
