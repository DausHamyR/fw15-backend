const citiesModel = require("../../models/cities.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllcities = async(request, response) => {
    try {
        const data = await citiesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all cities",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all cities not found",
    })
}

exports.getOnecities = async(request, response) => {
    try {
        const data = await citiesModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail cities",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createcities = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.path
        }
        const cities = await citiesModel.insert(data)
        return response.json({
            success: true,
            message: `Create cities ${request.body.name} successfully`,
            result: cities
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.updatecities = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        const cities = await citiesModel.update(request.params.id, data)
        if(!cities){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update cities successfully",
            results: cities
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.deletecities = async (request, response) => {
    try {
        const data = await citiesModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete cities successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: cities not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
