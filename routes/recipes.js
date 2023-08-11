/**
 * @swagger
 * tags:
 *   name: Recipes
 */
const router = require("express").Router();

const recipesController = require("../controllers/recipes");
const recipesValidator = require("../validators/recipes");

/**
 * @swagger
 * /recipes:
 *   get:
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
 *               title: Muzlu Smoothie
 *               ingredients: [ { "name": "Süt", "amount": "500 ML" }, { "name": "Muz", "amount": "1 Adet (Büyük Boy)" }, { "name": "Bal", "amount": "1 YK" } ]
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", recipesValidator.createRecipe, recipesController.createRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
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
 *               title: Çilekli Smoothie
 *               ingredients: [ { "name": "Süt", "amount": "400 ML" }, { "name": "Çilek", "amount": "11 Adet (Küçük Boy)" } ]
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
  recipesValidator.updateRecipe,
  recipesController.updateRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
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
  recipesValidator.deleteRecipe,
  recipesController.deleteRecipe
);

module.exports = router;
