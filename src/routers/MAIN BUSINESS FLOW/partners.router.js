const partnersRouter = require("express").Router()
const partnersController = require("../../controllers/MAIN BUSINESS FLOW/partners.controller")
// const validate = require("../../middlewares/validator.middleware")

partnersRouter.get("/", partnersController.getPartners)

module.exports = partnersRouter
