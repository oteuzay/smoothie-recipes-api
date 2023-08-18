/**
 * @swagger
 * tags:
 *   name: Auth
 */
const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Sign-up
 *     description: Endpoint for user registration.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: email@google.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: Internal Server Error
 */
router.post("/signup", authValidator.signUp, authController.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User Sign-in
 *     description: Endpoint for user authentication and obtaining tokens.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: email@google.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/signin", authValidator.signIn, authController.signIn);

/**
 * @swagger
 * /auth/signout:
 *   delete:
 *     summary: User Sign-out
 *     description: Endpoint for user logout and token invalidation.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 format: refreshToken
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/signout", authValidator.signOut, authController.signOut);

/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh Access Token
 *     description: Endpoint for refreshing an expired access token using a refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 format: refreshToken
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/refreshToken",
  authValidator.refreshToken,
  authController.refreshToken
);

module.exports = router;
