const authRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
const authController = require("../controllers/auth.controller")

authRouter.post("/login", validate("authLogin"), authController.login)
authRouter.post("/register", authController.register)

module.exports = authRouter
