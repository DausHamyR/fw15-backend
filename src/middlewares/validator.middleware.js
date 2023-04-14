const { body, query, param, validationResult } = require("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")

const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const strongPassword =  body("password").isStrongPassword().withMessage("Password must be strong!")

const rules = {
    authLogin: [
        emailFormat,
        body("password").isLength({min:1}).withMessage("Password is invalid")
    ],
    createUser: [
        body("username").isLength({min:3, max:20}).withMessage("Username length is invalid"),
        emailFormat,
        strongPassword
    ],
    getAllUsers: [
        query("sortBy").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid")
    ],
    idParams: [
        param("id").toInt().isDecimal().withMessage("ID is invalid").isInt({min: 1}).withMessage("ID tidak boleh kosong")
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try {
        if (!errors.isEmpty()) {
            fileRemover(request.file)
            throw Error("validation")
        }
        return next()
    }catch(err) {
        return response.status(400).json({
            success: false,
            message: "Validation error",
            results: errors.array()
        })
        // return errorHandler(response, err)
    }
}

const validate = (selectedRules) => [rules[selectedRules], validator]

module.exports = validate
