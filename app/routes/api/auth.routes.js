const router = require("express").Router();
const authController = require("../../controllers/auth.controller")

router
  .route("/home")
  .get(authController.homeSweetHome)

router
  .route("/register")
  .post(authController.signup)

router
  .route("/login")
  .post(authController.login)

module.exports = router;

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

