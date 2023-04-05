const router = require("express").Router()

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("/users", require("./users.router"))

module.exports = router
