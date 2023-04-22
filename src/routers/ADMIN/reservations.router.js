const reservationsRouter = require("express").Router()
const reservationsController = require("../../controllers/ADMIN/reservations.controller")
const validate = require("../../middlewares/validator.middleware")

reservationsRouter.get("/", validate("getAllUsers"), reservationsController.getAllreservations)
reservationsRouter.get("/:id", validate("idParams"), reservationsController.getOnereservations)
reservationsRouter.post("/", validate("createReservations"), reservationsController.createreservations)
reservationsRouter.patch("/:id", validate("idParams"), validate("updateReservations"), reservationsController.updatereservations)
reservationsRouter.delete("/:id", validate("idParams"), reservationsController.deletereservations)

module.exports = reservationsRouter
