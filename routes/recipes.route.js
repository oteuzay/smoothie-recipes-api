/**
 * @swagger
 * tags:
 *   name: Recipes
 */
const router = require("express").Router();

const recipesController = require("../controllers/recipes");
const recipesValidator = require("../validators/recipes");

const auth = require("../helpers/auth");

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get All Recipes
 *     description: Endpoint to retrieve a list of all recipes.
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", recipesValidator.getRecipes, recipesController.getRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get Recipe Details
 *     description: Endpoint to retrieve details of a specific recipe by ID.
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", recipesValidator.getRecipe, recipesController.getRecipe);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a New Recipe
 *     description: Endpoint to create a new recipe.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                  type: string
 *               ingredients:
 *                 type: Array
 *             example:
 *               title: Mango Smoothie
 *               ingredients: [ { "name": "Milk", "amount": "500 ML" }, { "name": "Mango", "amount": "1 Large (Ripe)" }, { "name": "Honey", "amount": "1 TBSP" } ]
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  auth.verifyAccessToken,
  recipesValidator.createRecipe,
  recipesController.createRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update Recipe
 *     description: Endpoint to update an existing recipe by ID.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                  type: string
 *               ingredients:
 *                 type: Array
 *             example:
 *               title: Berry Fusion Delight
 *               ingredients: [ { "name": "Milk", "amount": "400 ML" }, { "name": "Mixed Berries", "amount": "1 Cup" } ]
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/:id",
  auth.verifyAccessToken,
  recipesValidator.updateRecipe,
  recipesController.updateRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete Recipe
 *     description: Endpoint to delete a recipe by ID.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  auth.verifyAccessToken,
  recipesValidator.deleteRecipe,
  recipesController.deleteRecipe
);

module.exports = router;
