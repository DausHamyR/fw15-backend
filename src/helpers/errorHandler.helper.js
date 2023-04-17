const errorHandler = (response, err) => {
    if(err?.message === "blank_username") {
        return response.status(400).json({
            success: false,
            message: "username cannot be empty"
        })
    }
    if(err?.message?.includes("id_doesn't_exist")) {
        return response.status(400).json({
            success: false,
            message: "id is not in database"
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
    if(err?.message.includes("wrong_credentials")) {
        return response.status(401).json({
            success: false,
            message: "wrong email or password"
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
