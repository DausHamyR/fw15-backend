const historyRouter = require("express").Router()
const historyController = require("../../controllers/MAIN BUSINESS FLOW/history.controller")

historyRouter.get("/", historyController.getAllHistory)

module.exports = historyRouter
