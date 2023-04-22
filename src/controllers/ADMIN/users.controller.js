const userModel = require("../../models/users.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

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
        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.insert(data)
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            result: user
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updateUser = async (request, response) => {
    try {
        const hash = await argon.hash(String(request.body.password))
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.update(request.params.id, data)
        if(!user){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update user successfully",
            results: user
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
