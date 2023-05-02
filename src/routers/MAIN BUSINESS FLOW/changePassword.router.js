const changePasswordRouter = require("express").Router()
const changePasswordController = require("../../controllers/MAIN BUSINESS FLOW/changePassword.controller")
const validate = require("../../middlewares/validator.middleware")

changePasswordRouter.patch("/", validate("changePassword"), changePasswordController.updateChangePassword)

module.exports = changePasswordRouter
