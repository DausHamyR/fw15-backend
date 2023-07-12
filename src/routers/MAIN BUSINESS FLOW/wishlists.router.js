const wishlistsRouter = require("express").Router()
const wishlistsController = require("../../controllers/MAIN BUSINESS FLOW/wishlists.controller")
// const validate = require("../../middlewares/validator.middleware")

wishlistsRouter.get("/", wishlistsController.getWishlists)
wishlistsRouter.get("/:id", wishlistsController.getOneWishlist)
wishlistsRouter.post("/", wishlistsController.createInsertWishlists)
wishlistsRouter.delete("/:id", wishlistsController.deletewishlists)

module.exports = wishlistsRouter
