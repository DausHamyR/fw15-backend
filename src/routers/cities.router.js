const citiesRouter = require("express").Router()
const citiesController = require("../controllers/cities.controllers")
// const validate = require("../../middlewares/validator.middleware")

citiesRouter.get("/", citiesController.getCity)

module.exports = citiesRouter
