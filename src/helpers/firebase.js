var admin = require("firebase-admin")

var serviceAccount = require("../../cruelty-free-84f4f-firebase-adminsdk-oh76q-ace17f9b3c.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
