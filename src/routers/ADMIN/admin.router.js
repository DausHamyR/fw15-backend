const admin = require("express").Router()

admin.use("/users", require("./users.router"))

module.exports = admin
