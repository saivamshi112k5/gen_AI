const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/register",authController.RegisterNewUser);
authRouter.post("/login",authController.LoginController);

module.exports = authRouter;