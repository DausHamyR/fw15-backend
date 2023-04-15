const wishlistsRouter = require("express").Router()
const wishlistsController = require("../../controllers/ADMIN/wishlists.controller")
const validate = require("../../middlewares/validator.middleware")

wishlistsRouter.get("/", validate("getAllUsers"), wishlistsController.getAllwishlists)
wishlistsRouter.get("/:id", validate("idParams"), wishlistsController.getOnewishlists)
wishlistsRouter.post("/", validate("createWishlists"), wishlistsController.createwishlists)
wishlistsRouter.patch("/:id", validate("idParams"), validate("createWishlists"), wishlistsController.updatewishlists)
wishlistsRouter.delete("/:id", validate("idParams"), wishlistsController.deletewishlists)

module.exports = wishlistsRouter
