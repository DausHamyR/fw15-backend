const profileRouter = require("express").Router()
const profileController = require("../../controllers/ADMIN/profile.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

profileRouter.get("/", validate("getAllUsers"), profileController.getAllprofile)
profileRouter.get("/:id", validate("idParams"), profileController.getOneprofile)
profileRouter.post("/", validate("createUser"), uploadMiddleware, profileController.createprofile)
profileRouter.patch("/:id", validate("idParams"), validate("createUser"), uploadMiddleware, profileController.updateprofile)
profileRouter.delete("/:id", validate("idParams"), profileController.deleteprofile)

module.exports = profileRouter
