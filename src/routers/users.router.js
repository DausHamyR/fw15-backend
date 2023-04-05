const userRouter = require("express").Router()

// const { response } = require("express")
const userController = require("../controllers/users.controller")

userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getOneUser)
userRouter.post("/", userController.createUser)
userRouter.patch("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter
