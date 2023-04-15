const eventCategoriesRouter = require("express").Router()
const eventCategoriesController = require("../../controllers/ADMIN/eventCategories.controller")
const validate = require("../../middlewares/validator.middleware")

eventCategoriesRouter.get("/", validate("getAllUsers"), eventCategoriesController.getAllEventCategories)
eventCategoriesRouter.get("/:id", validate("idParams"), eventCategoriesController.getOneEventCategories)
eventCategoriesRouter.post("/", validate("createEventCategories"), eventCategoriesController.createEventCategories)
eventCategoriesRouter.patch("/:id", validate("idParams"), validate("createEventCategories"), eventCategoriesController.updateEventCategories)
eventCategoriesRouter.delete("/:id", validate("idParams"), eventCategoriesController.deleteEventCategories)

module.exports = eventCategoriesRouter
