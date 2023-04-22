const reservationStatusRouter = require("express").Router()
const reservationStatusController = require("../../controllers/MAIN BUSINESS FLOW/reservationStatus.controller")

reservationStatusRouter.get("/", reservationStatusController.getReservationStatus)

module.exports = reservationStatusRouter
