const reservationStatusRouter = require("express").Router()
const reservationStatusController = require("../../controllers/ADMIN/reservationStatus.controller")
const validate = require("../../middlewares/validator.middleware")

reservationStatusRouter.get("/", validate("getAllUsers"), reservationStatusController.getAllreservationStatus)
reservationStatusRouter.get("/:id", validate("idParams"), reservationStatusController.getOnereservationStatus)
reservationStatusRouter.post("/", validate("createReservationStatus"), reservationStatusController.createreservationStatus)
reservationStatusRouter.patch("/:id", validate("idParams"), validate("createReservationStatus"), reservationStatusController.updatereservationStatus)
reservationStatusRouter.delete("/:id", validate("idParams"), reservationStatusController.deletereservationStatus)

module.exports = reservationStatusRouter
