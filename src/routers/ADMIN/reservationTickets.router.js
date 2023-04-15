const reservationTicketsRouter = require("express").Router()
const reservationTicketsController = require("../../controllers/ADMIN/reservationTickets.controller")
const validate = require("../../middlewares/validator.middleware")

reservationTicketsRouter.get("/", validate("getAllUsers"), reservationTicketsController.getAllreservationTickets)
reservationTicketsRouter.get("/:id", validate("idParams"), reservationTicketsController.getOnereservationTickets)
reservationTicketsRouter.post("/", validate("createReservationTickets"), reservationTicketsController.createreservationTickets)
reservationTicketsRouter.patch("/:id", validate("idParams"), validate("createReservationTickets"), reservationTicketsController.updatereservationTickets)
reservationTicketsRouter.delete("/:id", validate("idParams"), reservationTicketsController.deletereservationTickets)

module.exports = reservationTicketsRouter
