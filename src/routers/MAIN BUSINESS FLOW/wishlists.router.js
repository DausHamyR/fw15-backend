const wishlistsRouter = require("express").Router()
const wishlistsController = require("../../controllers/MAIN BUSINESS FLOW/wishlists.controller")
// const validate = require("../../middlewares/validator.middleware")

wishlistsRouter.get("/", wishlistsController.getWishlists)
wishlistsRouter.post("/", wishlistsController.createInsertWishlists)

module.exports = wishlistsRouter
