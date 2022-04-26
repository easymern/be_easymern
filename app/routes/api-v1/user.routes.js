const router = require("express").Router();
const { authJWT } = require("../../middlewares");
const userController = require("../../controllers/user.controller")


router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/test/all")
  .get(userController.allAccess);

router
  .route("/test/user")
  .get(
    [
      authJWT.verifyToken
    ],
    userController.userBoard
  );

router
  .route("/test/mod")
  .get(
    [
      authJWT.verifyToken, authJWT.isModerator
    ],
    userController.moderatorBoard
  );

router
  .route("/test/admin")
  .get(
    [
      authJWT.verifyToken, authJWT.isAdmin
    ],
    userController.adminBoard
  );

module.exports = router;