const wishlistsRouter = require("express").Router()
const wishlistsController = require("../../controllers/MAIN BUSINESS FLOW/wishlists.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
// const validate = require("../../middlewares/validator.middleware")

wishlistsRouter.get("/", wishlistsController.getWishlists)
// wishlistsRouter.patch("/", uploadMiddleware("picture"), wishlistsController.updatewishlists)

module.exports = wishlistsRouter
