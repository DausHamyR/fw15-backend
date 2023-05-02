const errorHandler = (response, err) => {
    if(err?.message === "blank_username") {
        return response.status(400).json({
            success: false,
            message: "username cannot be empty"
        })
    }
    if(err?.message?.includes("section_not_found")) {
        return response.status(404).json({
            success: false,
            message: "Section not found"
        })
    }
    if(err?.message?.includes("event_not_found")) {
        return response.status(404).json({
            success: false,
            message: "Event not found"
        })
    }
    if(err?.message?.includes("wishlists_not_found")) {
        return response.status(404).json({
            success: false,
            message: "Wishlists not found"
        })
    }
    if(err?.message?.includes("partners_not_found")) {
        return response.status(404).json({
            success: false,
            message: "partners not found"
        })
    }
    if(err?.message?.includes("payment_not_available")) {
        return response.status(404).json({
            success: false,
            message: "Payment not available"
        })
    }
    if(err?.message?.includes("reservations_not_found")) {
        return response.status(404).json({
            success: false,
            message: "Reservations not found"
        })
    }
    if(err?.message?.includes("reservationStatus_not_found")) {
        return response.status(404).json({
            success: false,
            message: "History not found"
        })
    }
    if(err?.message?.includes("id_doesn't_exist")) {
        return response.status(400).json({
            success: false,
            message: "id is not in database"
        })
    }
    if(err?.message?.includes("categories_not_found")) {
        return response.status(404).json({
            success: false,
            message: "categories not found"
        })
    }
    if(err?.message?.includes("no_forgot_request")) {
        return response.status(401).json({
            success: false,
            message: "the code entered is incorrect"
        })
    }
    if(err?.message === "blank_password") {
        return response.status(400).json({
            success: false,
            message: "password cannot be empty"
        })
    }
    if(err?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: email already used!"
        })
    }
    if(err?.message?.includes("jwt malformed")) {
        return response.status(401).json({
            success: false,
            message: "Token is invalid!"
        })
    }
    if(err?.message?.includes("invalid signature")) {
        return response.status(401).json({
            success: false,
            message: "Token signature is invalid!"
        })
    }else if (err === undefined) {
        return response.status(404).json({
            success: false,
            message: "Error: user not found",
        })
    }else if (err.message === "invalid input syntax for type integer: \":id\"") {
        return response.status(400).json({
            success: false,
            message: "Error: Belum memasukan id",
        })
    }
    if(err?.message.includes("wrong_password")) {
        return response.status(401).json({
            success: false,
            message: "wrong password"
        })
    }
    if(err?.message.includes("wrong_email")) {
        return response.status(401).json({
            success: false,
            message: "wrong email"
        })
    }
    if(err?.message.includes("password_unmatch")) {
        return response.status(400).json({
            success: false,
            message: "Password and confirm password does not match"
        })
    }
    if(err?.message.includes("unauthorized")) {
        return response.status(401).json({
            success: false,
            message: "unauthorized"
        })
    }
    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error",
    })
}

module.exports = errorHandler
