const partnersModel = require("../../models/partners.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllpartners = async(request, response) => {
    try {
        const data = await partnersModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all partners",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all partners not found",
    })
}

exports.getOnepartners = async(request, response) => {
    try {
        const data = await partnersModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail partners",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createpartners = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        const partners = await partnersModel.insert(data)
        return response.json({
            success: true,
            message: `Create partners ${request.body.name} successfully`,
            result: partners
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.updatepartners = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const partners = await partnersModel.update(request.params.id, data)
        if(!partners){
            throw Error("id_doesn't_exist")
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        return response.json({
            success: true,
            message: "Update partners successfully",
            results: partners
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.deletepartners = async (request, response) => {
    try {
        const data = await partnersModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete partners successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: partners not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
