const { body, query, param, validationResult} = require("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

const createUsername = body("username").isLength({min:3, max:20}).withMessage("Username length is invalid")
const createName = body("name").isLength({min:3, max:100}).withMessage("Name length is invalid")
const createEmailFormat = body("email").isEmail().withMessage("Email is invalid")
const createStrongPassword =  body("password").isStrongPassword().withMessage("Password must be strong!")
const updateName = body("name").optional().isLength({min:3, max:100}).withMessage("Name length is invalid")
const updateFullName = body("fullName").optional().isLength({min:3, max:100}).withMessage("FullName length is invalid")
const updateBody = body("username").optional().isLength({min:3, max:20}).withMessage("Username length is invalid")
const updateEmailFormat = body("email").optional().isEmail().withMessage("Email is invalid")
const updateStrongPassword =  body("password").optional().isStrongPassword().withMessage("Password must be strong!")
const updatePhoneNumber =  body("phoneNumber").optional().isMobilePhone().withMessage("Invalid phone number")
const updateDate =  body("date").optional().isDate().withMessage("invalid date format")
const updateGender =  body("gender").optional().isBoolean({female: true, male: false}).withMessage("wrong gender")
const updateProfession =  body("profession").optional().isString().withMessage("Profession must be a string")
const updateNationality =  body("nationality").optional().isAlpha().withMessage("Invalid nationality value")
// const idCheck = param("id").toInt().isDecimal().withMessage("ID is invalid").isInt({min: 1}).withMessage("ID tidak boleh kosong")
// const createCategoriess = body("name").isLength({min:3, max:20}).withMessage("name length is invalid")

const rules = {
    authLogin: [
        createEmailFormat,
        body("password").isLength({min:1}).withMessage("Password is invalid")
    ],
    createUser: [
        createUsername,
        createEmailFormat,
        createStrongPassword
    ],
    updateUser: [
        updateBody,
        updateEmailFormat,
        updateStrongPassword
    ],
    createCities: [
        createName
    ],
    updateCities: [
        updateName
    ],
    createPartners: [
        createName
    ],
    updatePartners: [
        updateName
    ],
    createCategories: [
        createName
    ],
    updateCategories: [
        updateName
    ],
    createReservationStatus: [
        createName
    ],
    createEventCategories: [
        body("eventId").isNumeric().withMessage("eventId must be a number"),
        body("categoryId").isNumeric().withMessage("categoryId must be a number")
    ],
    updateEventCategories: [
        body("eventId").optional().isNumeric().withMessage("eventId must be a number"),
        body("categoryId").optional().isNumeric().withMessage("categoryId must be a number")
    ],
    createEvent: [
        body("title").isLength({min:3, max:20}).withMessage("title length is invalid"),
        body("date").isDate().withMessage("invalid date format"),
        body("cityId").isDecimal({decimal_digits: 1}).withMessage("cityId is invalid"),
        body("descriptions").isLength({min: 6}).withMessage("Descriptions less than 6 characters").isLength({max: 200}).withMessage("Descriptions maximum 200 characters")
    ],
    updateEvent: [
        body("title").optional().isLength({min:3, max:20}).withMessage("title length is invalid"),
        body("date").optional().isDate().withMessage("invalid date format"),
        body("cityId").optional().isDecimal({decimal_digits: 1}).withMessage("cityId is invalid"),
        body("descriptions").optional().isLength({min: 6}).withMessage("Descriptions less than 6 characters").isLength({max: 200}).withMessage("Descriptions maximum 200 characters")
    ],
    createProfile: [
        body("fullName").optional().isLength({min:3, max:30}).withMessage("fullName length is invalid"),
        body("phoneNumber").optional().isMobilePhone().withMessage("Invalid phone number"),
        body("gender").optional().isBoolean({female: true, male: false}).withMessage("wrong gender"),
        body("profession").optional().isString().withMessage("Profession must be a string"),
        body("nationality").optional().isAlpha().withMessage("Invalid nationality value"),
        body("birthDate").optional({nullable: true}).isDate().withMessage("Invalid birth date value"),
        body("userId").optional().isDecimal({decimal_digits: 1}).withMessage("userId is invalid")
    ],
    createReservations: [
        body("eventId").isDecimal({decimal_digits: 1}).withMessage("eventId is invalid"),
        body("userId").isDecimal({decimal_digits: 1}).withMessage("userId is invalid"),
        body("statusId").isDecimal({decimal_digits: 1}).withMessage("statusId is invalid"),
        body("paymentMethodId").isDecimal({decimal_digits: 1}).withMessage("paymentMethodId is invalid")
    ],
    updateReservations: [
        body("eventId").optional().isDecimal({decimal_digits: 1}).withMessage("eventId is invalid"),
        body("userId").optional().isDecimal({decimal_digits: 1}).withMessage("userId is invalid"),
        body("statusId").optional().isDecimal({decimal_digits: 1}).withMessage("statusId is invalid"),
        body("paymentMethodId").optional().isDecimal({decimal_digits: 1}).withMessage("paymentMethodId is invalid")
    ],
    createReservationSections: [
        createName,
        body("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number")
    ],
    updateReservationSections: [
        updateName,
        body("price").optional().notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number")
    ],
    createReservationTickets: [
        body("reservationId").notEmpty().withMessage("ReservationId is required").isNumeric().withMessage("ReservationId must be a number"),
        body("sectionId").notEmpty().withMessage("SectionId is required").isNumeric().withMessage("SectionId must be a number"),
        body("quantity").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be a number")
    ],
    updateReservationTickets: [
        body("reservationId").optional().notEmpty().withMessage("ReservationId is required").isNumeric().withMessage("ReservationId must be a number"),
        body("sectionId").optional().notEmpty().withMessage("SectionId is required").isNumeric().withMessage("SectionId must be a number"),
        body("quantity").optional().notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be a number")
    ],
    createWishlists: [
        body("eventId").optional().notEmpty().withMessage("eventId is required").isNumeric().withMessage("eventId must be a number"),
        body("userId").optional().notEmpty().withMessage("userId is required").isNumeric().withMessage("userId must be a number")
    ],
    getAllUsers: [
        query("sortBy").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid")
    ],
    idParams: [
        param("id").toInt().isDecimal().withMessage("ID is invalid").isInt({min: 1}).withMessage("ID tidak boleh kosong")
    ],
    resetPassword: [
        body("confirmPassword").custom((value, {req}) => {
            return value === req.body.password
        }).withMessage("confirm password does not match")
    ],
    updateProfile: [
        updateFullName,
        updateBody,
        updateEmailFormat,
        updatePhoneNumber,
        updateGender,
        updateProfession,
        updateNationality,
        updateDate
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
