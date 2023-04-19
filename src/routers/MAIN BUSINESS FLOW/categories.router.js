const categoriesRouter = require("express").Router()
const categoriesController = require("../../controllers/MAIN BUSINESS FLOW/categories.controller")
// const validate = require("../../middlewares/validator.middleware")

categoriesRouter.get("/", categoriesController.getCategories)

module.exports = categoriesRouter
