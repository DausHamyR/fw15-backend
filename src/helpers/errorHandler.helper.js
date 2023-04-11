const errorHandler = (response, err) => {
    if(err?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: email already used!",
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
    console.log(err.message)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error",
    })
}

module.exports = errorHandler
