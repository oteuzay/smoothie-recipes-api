const Recipe = require("../models/recipe");

const createError = require("http-errors");

/* The `getRecipes` function is responsible for retrieving a list of recipes. */
exports.getRecipes = async (req, res, next) => {
  const currentPage = parseInt(req.query.page || 1);
  const perPage = 10;

  try {
    const countRecipes = await Recipe.find().countDocuments();

    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.json({
      recipes: recipes.map((recipe) => recipe.toJSON()),
      pagination: {
        currentPage: currentPage,
        lastPage: Math.ceil(countRecipes / perPage),
        countRecipes: countRecipes,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* The `getRecipe` function is responsible for retrieving a specific recipe by its ID. */
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      throw createError.NotFound();
    }

    res.json({
      recipe: recipe.toJSONForDetail(),
    });
  } catch (error) {
    next(error);
  }
};

/* The `createRecipe` function is responsible for creating a new recipe. */
exports.createRecipe = async (req, res, next) => {
  const { title, ingredients } = req.body;

  try {
    const recipe = await Recipe({
      title: title,
      recipe: { ingredients: ingredients },
    }).save();

    res.json({
      message: "Recipe successfully created.",
      recipe: recipe.toJSONForDetail(),
    });
  } catch (error) {
    next(error);
  }
};

/* The `updateRecipe` function is responsible for updating a recipe item. */
exports.updateRecipe = async (req, res, next) => {
  const { title, ingredients } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      throw createError.NotFound();
    }

    recipe.title = title;
    recipe.recipe.ingredients = ingredients;

    const updatedRecipe = await recipe.save();

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
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      throw createError.NotFound();
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({
      message: "Recipe successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};
