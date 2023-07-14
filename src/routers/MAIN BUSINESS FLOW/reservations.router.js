const reservationsRouter = require("express").Router()
const reservationsController = require("../../controllers/MAIN BUSINESS FLOW/reservations.controller")
// const validate = require("../../middlewares/validator.middleware")

reservationsRouter.get("/", reservationsController.getReservation)
reservationsRouter.post("/", reservationsController.createInsertReservations)

module.exports = reservationsRouter
