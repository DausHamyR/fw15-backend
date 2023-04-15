const reservationsModel = require("../../models/reservations.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllreservations = async(request, response) => {
    try {
        const data = await reservationsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all reservations",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all reservations not found",
    })
}

exports.getOnereservations = async(request, response) => {
    try {
        const data = await reservationsModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail reservations",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createreservations = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservations = await reservationsModel.insert(data)
        return response.json({
            success: true,
            message: "Create reservations successfully",
            result: reservations
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updatereservations = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservations = await reservationsModel.update(request.params.id, data)
        return response.json({
            success: true,
            message: "Update reservations successfully",
            results: reservations
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deletereservations = async (request, response) => {
    try {
        const data = await reservationsModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete reservations successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: reservations not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
