const eventsRouter = require("express").Router()
const eventsController = require("../../controllers/ADMIN/events.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

eventsRouter.get("/", validate("getAllUsers"), eventsController.getAllevents)
eventsRouter.get("/:id", validate("idParams"), eventsController.getOneevents)
eventsRouter.post("/", validate("createUser"), uploadMiddleware, eventsController.createevents)
eventsRouter.patch("/:id", validate("idParams"), validate("createUser"), uploadMiddleware, eventsController.updateevents)
eventsRouter.delete("/:id", validate("idParams"), eventsController.deleteevents)

module.exports = eventsRouter
