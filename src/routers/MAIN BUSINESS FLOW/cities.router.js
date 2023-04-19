const citiesRouter = require("express").Router()
const citiesController = require("../../controllers/MAIN BUSINESS FLOW/cities.controllers")
// const validate = require("../../middlewares/validator.middleware")

citiesRouter.get("/", citiesController.getCity)

module.exports = citiesRouter
