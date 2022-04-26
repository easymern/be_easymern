const router = require("express").Router();
const authRoutes = require("./auth.routes");

// Auth Routes
router.use("/auth", authRoutes);

module.exports = router;