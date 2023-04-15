const admin = require("express").Router()

admin.use("/users", require("./users.router"))
admin.use("/categories", require("./categories.router"))
admin.use("/cities", require("./cities.router"))
admin.use("/eventCategories", require("./eventCategories.router"))
admin.use("/events", require("./events.router"))
admin.use("/partners", require("./partners.router"))
admin.use("/paymentMethod", require("./paymentMethod.router"))
admin.use("/profile", require("./profile.router"))
admin.use("/reservations", require("./reservations.router"))
admin.use("/reservationSections", require("./reservationSections.router"))
admin.use("/reservationStatus", require("./reservationStatus.router"))
admin.use("/reservationTickets", require("./reservationTickets.router"))
admin.use("/wishlists", require("./wishlists.router"))

module.exports = admin
