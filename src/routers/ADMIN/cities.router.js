const citiesRouter = require("express").Router()
const citiesController = require("../../controllers/ADMIN/cities.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

citiesRouter.get("/", validate("getAllUsers"), citiesController.getAllcities)
citiesRouter.get("/:id", validate("idParams"), citiesController.getOnecities)
citiesRouter.post("/", uploadMiddleware("picture"), validate("createCities"), citiesController.createcities)
citiesRouter.patch("/:id", validate("idParams"), uploadMiddleware("picture"), validate("createCities"), citiesController.updatecities)
citiesRouter.delete("/:id", validate("idParams"), citiesController.deletecities)

module.exports = citiesRouter
