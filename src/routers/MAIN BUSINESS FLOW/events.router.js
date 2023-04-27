const eventsRouter = require("express").Router()
const eventsController = require("../../controllers/MAIN BUSINESS FLOW/events.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
// const validate = require("../../middlewares/validator.middleware")

eventsRouter.get("/", eventsController.getEvents)
eventsRouter.get("/:id", eventsController.getOneEvents)
eventsRouter.post("/", uploadMiddleware("picture"), eventsController.createInsertEvent)
eventsRouter.patch("/", uploadMiddleware("picture"), eventsController.updateEvent)

module.exports = eventsRouter
