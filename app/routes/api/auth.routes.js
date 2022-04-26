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

// router
//   .route("/logout")
//   .get(authController.logout)

router
  .route("/getUsername")
  .get(verifyJWT, authController.getUsername)

router
  .route("/isUserAuth")
  .get(verifyJWT, authController.isUserAuth)

module.exports = router;
