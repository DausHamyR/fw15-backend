const partnersRouter = require("express").Router()
const partnersController = require("../../controllers/ADMIN/partners.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

partnersRouter.get("/", validate("getAllUsers"), partnersController.getAllpartners)
partnersRouter.get("/:id", validate("idParams"), partnersController.getOnepartners)
partnersRouter.post("/", validate("createUser"), uploadMiddleware, partnersController.createpartners)
partnersRouter.patch("/:id", validate("idParams"), validate("createUser"), uploadMiddleware, partnersController.updatepartners)
partnersRouter.delete("/:id", validate("idParams"), partnersController.deletepartners)

module.exports = partnersRouter
