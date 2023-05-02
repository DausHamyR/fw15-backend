const paymentRouter = require("express").Router()
const paymentController = require("../../controllers/MAIN BUSINESS FLOW/payment.controller")

paymentRouter.post("/", paymentController.createPayment)

module.exports = paymentRouter
