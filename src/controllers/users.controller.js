// const { request, response } = require("express")

// const { response } = require("express")

exports.getAllUsers = (request, response) => {
    const data = [
        {
            name: "Bob",
            phone: "085383262"
        }
    ]
    return response.json({
        success: true,
        message: "List of all users",
        results: data
    })
}

exports.createUser = (request, response) => {
    return response.json({
        success: true,
        message: `Create user ${request.body.fullname} successfully`
    })
}

exports.updateUser = (request, response) => {
    return response.json({
        success: true,
        message: `Update user ${request.params.id} successfully`
    })
}

exports.deleteUser = (request, response) => {
    return response.json({
        success: true,
        message: `Delete user ${request.params.id} successfully`
    })
}
