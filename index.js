require("dotenv").config({
    path: ".env"
})

const express = require("express")

const app = express()
app.use(express.urlencoded({extended: false}))

app.use("/", require("./src/routers/index"))

const {PORT} = process.env
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
