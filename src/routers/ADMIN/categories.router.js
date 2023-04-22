const categoriesRouter = require("express").Router()
const categoriesController = require("../../controllers/ADMIN/categories.controller")
const validate = require("../../middlewares/validator.middleware")

categoriesRouter.get("/", validate("getAllUsers"), categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("idParams"), categoriesController.getOneCategories)
categoriesRouter.post("/", validate("createCategories"), categoriesController.createCategories)
categoriesRouter.patch("/:id", validate("idParams"), validate("updateCategories"), categoriesController.updateCategories)
categoriesRouter.delete("/:id", validate("idParams"), categoriesController.deleteCategories)

module.exports = categoriesRouter
