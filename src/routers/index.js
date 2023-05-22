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
router.use("/city", require("./MAIN BUSINESS FLOW/cities.router"))
router.use("/categories", require("./MAIN BUSINESS FLOW/categories.router"))
router.use("/partners", require("./MAIN BUSINESS FLOW/partners.router"))
router.use("/events", require("./MAIN BUSINESS FLOW/events.router"))
router.use("/history", authMiddleware, require("./MAIN BUSINESS FLOW/history.router"))
router.use("/wishlists", authMiddleware, require("./MAIN BUSINESS FLOW/wishlists.router"))
router.use("/changePassword", authMiddleware, require("./MAIN BUSINESS FLOW/changePassword.router"))
router.use("/reservations", authMiddleware, require("./MAIN BUSINESS FLOW/reservations.router"))
router.use("/payment", authMiddleware, require("./MAIN BUSINESS FLOW/payment.router"))
router.use("/sections", authMiddleware, require("./MAIN BUSINESS FLOW/section.router"))

router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router
