const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

// Auth Routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes)

module.exports = router;