const reservationSectionsRouter = require("express").Router()
const reservationSectionsController = require("../../controllers/ADMIN/reservationSections.controller")
const validate = require("../../middlewares/validator.middleware")

reservationSectionsRouter.get("/", validate("getAllUsers"), reservationSectionsController.getAllreservationSections)
reservationSectionsRouter.get("/:id", validate("idParams"), reservationSectionsController.getOnereservationSections)
reservationSectionsRouter.post("/", validate("createReservationSections"), reservationSectionsController.createreservationSections)
reservationSectionsRouter.patch("/:id", validate("idParams"), validate("createReservationSections"), reservationSectionsController.updatereservationSections)
reservationSectionsRouter.delete("/:id", validate("idParams"), reservationSectionsController.deletereservationSections)

module.exports = reservationSectionsRouter
