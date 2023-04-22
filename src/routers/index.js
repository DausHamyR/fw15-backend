const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("/auth", require("./auth.router"))
router.use("/admin", authMiddleware, require("./ADMIN/admin.router"))
router.use("/profile", authMiddleware, require("./MAIN BUSINESS FLOW/profile.router"))
router.use("/city", authMiddleware, require("./MAIN BUSINESS FLOW/cities.router"))
router.use("/categories", authMiddleware, require("./MAIN BUSINESS FLOW/categories.router"))
router.use("/partners", authMiddleware, require("./MAIN BUSINESS FLOW/partners.router"))
router.use("/events", authMiddleware, require("./MAIN BUSINESS FLOW/events.router"))
router.use("/wishlists", authMiddleware, require("./MAIN BUSINESS FLOW/wishlists.router"))
router.use("/history", authMiddleware, require("./MAIN BUSINESS FLOW/reservationStatus.router"))

router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router
