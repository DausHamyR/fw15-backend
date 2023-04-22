const paymentMethodRouter = require("express").Router()
const paymentMethodController = require("../../controllers/ADMIN/paymentMethod.controller")
const validate = require("../../middlewares/validator.middleware")

paymentMethodRouter.get("/", validate("getAllUsers"), paymentMethodController.getAllpaymentMethod)
paymentMethodRouter.get("/:id", validate("idParams"), paymentMethodController.getOnepaymentMethod)
paymentMethodRouter.post("/", validate("createPartners"), paymentMethodController.createpaymentMethod)
paymentMethodRouter.patch("/:id", validate("idParams"), validate("createPartners"), paymentMethodController.updatepaymentMethod)
paymentMethodRouter.delete("/:id", validate("idParams"), paymentMethodController.deletepaymentMethod)

module.exports = paymentMethodRouter
