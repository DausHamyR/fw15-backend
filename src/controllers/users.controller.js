const userModel = require("../models/users.model")
const errorHandler = require("../helpers/errorHandler.helper")

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
    try {
        const data = await userModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail user",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createUser = async (request, response) => {
    try {
        const data = await userModel.insert(request.body)
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            result: data
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updateUser = async (request, response) => {
    try {
        const data = await userModel.update(request.params.id, request.body)
        if(data){
            return response.json({
                success: true,
                message: "Update user successfully",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deleteUser = async (request, response) => {
    try {
        const data = await userModel.destroy(request.params.id)
        return response.json({
            success: true,
            message: "Delete user successfully",
            result: data
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
