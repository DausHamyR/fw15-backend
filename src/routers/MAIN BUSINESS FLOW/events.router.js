const eventsRouter = require("express").Router()
const eventsController = require("../../controllers/MAIN BUSINESS FLOW/events.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
// const validate = require("../../middlewares/validator.middleware")

eventsRouter.get("/manage", eventsController.getAllEventsManage)
eventsRouter.get("/manage/:id", eventsController.getDetailEventsManage)
eventsRouter.post("/manage", uploadMiddleware("picture"), eventsController.createInsertEvent)
eventsRouter.patch("/manage", uploadMiddleware("picture"), eventsController.updateEvent)
eventsRouter.delete("/manage/:id", eventsController.deleteManageEvent)
eventsRouter.get("/", eventsController.getEvents)
eventsRouter.get("/:id", eventsController.getOneEvents)

module.exports = eventsRouter
