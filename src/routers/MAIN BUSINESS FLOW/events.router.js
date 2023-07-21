const eventsRouter = require("express").Router()
const eventsController = require("../../controllers/MAIN BUSINESS FLOW/events.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
// const validate = require("../../middlewares/validator.middleware")
const authMiddleware = require("../../middlewares/auth.middleware")

eventsRouter.get("/manage", authMiddleware, eventsController.getAllEventsManage)
eventsRouter.get("/manage/:id", authMiddleware, eventsController.getDetailEventsManage)
eventsRouter.post("/manage", authMiddleware, uploadMiddleware("picture"), eventsController.createInsertEvent)
eventsRouter.patch("/manage/:id", authMiddleware, uploadMiddleware("picture"), eventsController.updateEvent)
eventsRouter.delete("/manage/:id", authMiddleware, eventsController.deleteManageEvent)
eventsRouter.get("/", eventsController.getEvents)
eventsRouter.get("/:id", eventsController.getOneEvents)

module.exports = eventsRouter
