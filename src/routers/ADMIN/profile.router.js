const profileRouter = require("express").Router()
const profileController = require("../../controllers/ADMIN/profile.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

profileRouter.get("/", validate("getAllUsers"), profileController.getAllprofile)
profileRouter.get("/:id", validate("idParams"), profileController.getOneprofile)
profileRouter.post("/", uploadMiddleware("picture"), validate("createProfile"), profileController.createprofile)
profileRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"), validate("createProfile"), profileController.updateprofile)
profileRouter.delete("/:id", validate("idParams"), profileController.deleteprofile)

module.exports = profileRouter
