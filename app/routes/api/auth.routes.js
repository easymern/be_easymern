const router = require("express").Router();
const authController = require("../../controllers/auth.controller")
const {verifyJWT} = require("../../middlewares");

router
  .route("/home")
  .get(authController.homeSweetHome)

router
  .route("/register")
  .post(authController.signup)

router
  .route("/login")
  .post(authController.login)

router
  .route("/getUsername")
  .get(verifyJWT, authController.getUsername)

module.exports = router;
