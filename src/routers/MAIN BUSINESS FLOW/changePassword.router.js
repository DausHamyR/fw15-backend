const changePasswordRouter = require("express").Router()
const changePasswordController = require("../../controllers/MAIN BUSINESS FLOW/changePassword.controller")

changePasswordRouter.patch("/", changePasswordController.updateChangePassword)

module.exports = changePasswordRouter
