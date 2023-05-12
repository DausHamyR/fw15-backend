const historyRouter = require("express").Router()
const historyController = require("../../controllers/MAIN BUSINESS FLOW/history.controller")

historyRouter.get("/", historyController.getHistory)

module.exports = historyRouter
