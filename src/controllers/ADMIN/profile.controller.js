const profileModel = require("../../models/profile.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllprofile = async(request, response) => {
    try {
        const data = await profileModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all profiles",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all profiles not found",
    })
}

exports.getOneprofile = async(request, response) => {
    try {
        const data = await profileModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail profile",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createprofile = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        const profile = await profileModel.insert(data)
        return response.json({
            success: true,
            message: `Create profile ${request.body.email} successfully`,
            result: profile
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.updateprofile = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        const profile = await profileModel.update(request.params.id, data)
        return response.json({
            success: true,
            message: "Update profile successfully",
            results: profile
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.deleteprofile = async (request, response) => {
    try {
        const data = await profileModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete profile successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: profile not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
