const router = require("express").Router();
const apiRoutes = require("./api-v1");

// API Routes
router.use("/api-v1", apiRoutes);

module.exports = router;