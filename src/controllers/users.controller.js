const userModel = require("../models/users.model")

exports.getAllUsers = async(request, response) => {
    const data = await userModel.findAll()
    if(data){
        return response.json({
            success: true,
            message: "List of all users",
            results: data
        })
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all users not found",
    })
}

exports.getOneUser = async(request, response) => {
    const data = await userModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail user",
            results: data
        })
    }
    return response.status(404).json({
        success: false,
        message: "Error: user not found",
    })
}

exports.createUser = async (request, response) => {
    const data = await userModel.insert(request.body)
    if(data){
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            result: data
        })
    }
    return response.status(404).json({
        success: false,
        message: `Errpr: user ${request.body.email} not found`,
    })
}

exports.updateUser = async (request, response) => {
    const data = await userModel.update(request.params.id, request.body)
    if(data){
        return response.json({
            success: true,
            message: "Update user successfully",
            results: data
        })
    }
    return response.status(404).json({
        success: false,
        message: "Error user not found",
    })
}

exports.deleteUser = async (request, response) => {
    const data = await userModel.destroy(request.params.id)
    return response.json({
        success: true,
        message: "Delete user successfully",
        result: data
    })
}
