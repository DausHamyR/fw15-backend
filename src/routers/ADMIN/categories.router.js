const categoriesRouter = require("express").Router()
const categoriesController = require("../../controllers/ADMIN/categories.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

categoriesRouter.get("/", validate("getAllUsers"), categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("idParams"), categoriesController.getOneCategories)
categoriesRouter.post("/", validate("createUser"), categoriesController.createCategories)
categoriesRouter.patch("/:id", validate("idParams"), validate("createUser"), categoriesController.updateCategories)
categoriesRouter.delete("/:id", validate("idParams"), categoriesController.deleteCategories)

module.exports = categoriesRouter
