const express = require("express");
const { authController } = require("../Controllers");
const app = express();
const router = express.Router();

// register new user
router.post("/registration", authController.registerUser);
// login existing user
router.get("/login", authController.loginUser);

module.exports = router;
