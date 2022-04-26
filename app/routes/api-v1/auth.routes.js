const router = require("express").Router();
const authController = require("../../controllers/auth.controller")
const { verifyRegister } = require("../../middlewares")


router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/register")
  .post(
    [
      verifyRegister.checkDuplicateEmail,
      verifyRegister.checkDuplicateUsername,
      verifyRegister.checkRolesExist
    ],
    authController.register)

router
  .route("/login")
  .post(authController.login)

module.exports = router;
