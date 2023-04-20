const express = require("express");
const {
  loginController,
  registerController,
  profileController,
} = require("../controllers/AuthController.js");
const isAuth = require("../controllers/isAuth");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/profile", profileController);
router.post("/is_auth", isAuth);
module.exports = router;
