const sectionRouter = require("express").Router()
const sectionController = require("../../controllers/MAIN BUSINESS FLOW/section.controller")

sectionRouter.get("/", sectionController.getAllSection)

module.exports = sectionRouter
