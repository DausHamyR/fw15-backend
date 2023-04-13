const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const explode = file.originalname.split(".").length
        const ext = file.originalname.split(".")[explode - 1]
        const filename = new Date().getTime().toString() + "." + ext
        cb(null, filename)
    }
})

const limits = {
    fileSize: 1 * 1024 * 1024
}
const fileFilter = (req, file, cb) => {
    if(file.mimetype !== "image/jpeg"){
        cb(Error("fileformat_error"))
    }
    cb(null, true)
}

const upload = multer({storage, limits, fileFilter})

const uploadMiddleware = (field) => {
    const uploadField = upload.single(field)
    return (request, response, next) => {
        uploadField(request, response, (err) => {
            if(err) {
                if(err.message === "fileformat_error"){
                    return response.status(400).json({
                        success: false,
                        message: "File format invalid"
                    })
                }
                return response.status(400).json({
                    success: false,
                    message: "File too large"
                })
            }
            return next()
        })
    }
}

module.exports = uploadMiddleware
