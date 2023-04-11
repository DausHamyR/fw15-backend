const userModel = require("../models/users.model")
const errorHandler = require("../helpers/errorHandler.helper")
// const { request, response } = require("express")

exports.getAllUsers = async(request, response) => {
    try {
        const data = await userModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all users",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
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
        if(request.body.email == "" && request.body.password == "") {
            return response.status(400).json({
                success: false,
                message: "Error: Email dan Password belum di isi",
            })
        }
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
        if(request.body.email == "" && request.body.password == ""){
            return  response.status(400).json({
                success: false,
                message: "Error: Email dan Password belum di isi",
            })
        }
        const data = await userModel.update(request.params.id, request.body)
        return response.json({
            success: true,
            message: "Update user successfully",
            results: data
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deleteUser = async (request, response) => {
    try {
        const data = await userModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete user successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: user not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
