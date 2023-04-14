const citiesRouter = require("express").Router()
const citiesController = require("../../controllers/ADMIN/cities.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

citiesRouter.get("/", validate("getAllUsers"), citiesController.getAllcities)
citiesRouter.get("/:id", validate("idParams"), citiesController.getOnecities)
citiesRouter.post("/", validate("createUser"), uploadMiddleware, citiesController.createcities)
citiesRouter.patch("/:id", validate("idParams"), validate("createUser"), uploadMiddleware, citiesController.updatecities)
citiesRouter.delete("/:id", validate("idParams"), citiesController.deletecities)

module.exports = citiesRouter
