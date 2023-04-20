const partnersRouter = require("express").Router()
const partnersController = require("../../controllers/ADMIN/partners.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

partnersRouter.get("/", validate("getAllUsers"), partnersController.getAllpartners)
partnersRouter.get("/:id", validate("idParams"), partnersController.getOnepartners)
partnersRouter.post("/", uploadMiddleware("picture"), validate("createPartners"), partnersController.createpartners)
partnersRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"), validate("createPartners"), partnersController.updatepartners)
partnersRouter.delete("/:id", validate("idParams"), partnersController.deletepartners)

module.exports = partnersRouter
