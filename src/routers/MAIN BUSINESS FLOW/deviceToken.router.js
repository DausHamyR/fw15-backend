const deviceTokenRouter = require("express").Router()
const deviceTokenController = require("../../controllers/MAIN BUSINESS FLOW/deviceToken.controller")
// const validate = require("../../middlewares/validator.middleware")

deviceTokenRouter.post("/", deviceTokenController.saveToken)

module.exports = deviceTokenRouter
