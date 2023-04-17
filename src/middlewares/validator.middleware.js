const { body, query, param, validationResult} = require("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const strongPassword =  body("password").isStrongPassword().withMessage("Password must be strong!")
// const idCheck = param("id").toInt().isDecimal().withMessage("ID is invalid").isInt({min: 1}).withMessage("ID tidak boleh kosong")
// const createCategoriess = body("name").isLength({min:3, max:20}).withMessage("name length is invalid")


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
    createCities: [
        body("name").isLength({min:3, max:20}).withMessage("name length is invalid")
    ],
    createCategories: [
        body("name").isLength({min:3, max:20}).withMessage("name length is invalid")
    ],
    createEventCategories: [
        body("eventId").isNumeric().withMessage("eventId must be a number"),
        body("categoryId").isNumeric().withMessage("categoryId must be a number")
    ],
    createEvent: [
        body("title").isLength({min:3, max:20}).withMessage("title length is invalid"),
        body("date").isDate().withMessage("invalid date format"),
        body("cityId").isDecimal({decimal_digits: 1}).withMessage("cityId is invalid"),
        body("descriptions").isLength({min: 6}).withMessage("Descriptions less than 6 characters").isLength({max: 200}).withMessage("Descriptions maximum 200 characters")
    ],
    createProfile: [
        body("fullName").isLength({min:3, max:30}).withMessage("fullName length is invalid"),
        body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
        body("gender").isBoolean({female: true, male: false}).withMessage("wrong gender"),
        body("profession").isString().withMessage("Profession must be a string"),
        body("nationality").isAlpha().withMessage("Invalid nationality value"),
        body("birthDate").isDate().withMessage("Invalid birth date value"),
        body("userId").isDecimal({decimal_digits: 1}).withMessage("userId is invalid")
    ],
    createReservations: [
        body("eventId").isDecimal({decimal_digits: 1}).withMessage("eventId is invalid"),
        body("userId").isDecimal({decimal_digits: 1}).withMessage("userId is invalid"),
        body("statusId").isDecimal({decimal_digits: 1}).withMessage("statusId is invalid"),
        body("paymentMethodId").isDecimal({decimal_digits: 1}).withMessage("paymentMethodId is invalid")
    ],
    createReservationSections: [
        body("name").isLength({min:3, max:30}).withMessage("name length is invalid"),
        body("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number")
    ],
    createReservationTickets: [
        body("reservationId").notEmpty().withMessage("ReservationId is required").isNumeric().withMessage("ReservationId must be a number"),
        body("sectionId").notEmpty().withMessage("SectionId is required").isNumeric().withMessage("SectionId must be a number"),
        body("quantity").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be a number")
    ],
    createWishlists: [
        body("eventId").notEmpty().withMessage("eventId is required").isNumeric().withMessage("eventId must be a number"),
        body("userId").notEmpty().withMessage("userId is required").isNumeric().withMessage("userId must be a number")
    ],
    getAllUsers: [
        query("sortBy").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid")
    ],
    idParams: [
        param("id").toInt().isDecimal().withMessage("ID is invalid").isInt({min: 1}).withMessage("ID tidak boleh kosong")
    ],
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try {
        if (!errors.isEmpty()) {
            fileRemover(request.file)
            throw Error("validation")
        }
        // if (!idCheck) {
        //     throw Error("id_doesn't_exist")
        // }
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
