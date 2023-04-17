const reservationStatusModel = require("../../models/reservationStatus.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllreservationStatus = async(request, response) => {
    try {
        const data = await reservationStatusModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all reservationStatus",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all reservationStatus not found",
    })
}

exports.getOnereservationStatus = async(request, response) => {
    try {
        const data = await reservationStatusModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail reservationStatus",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createreservationStatus = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservationStatus = await reservationStatusModel.insert(data)
        return response.json({
            success: true,
            message: `Create reservationStatus ${request.body.email} successfully`,
            result: reservationStatus
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updatereservationStatus = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservationStatus = await reservationStatusModel.update(request.params.id, data)
        if(!reservationStatus){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update reservationStatus successfully",
            results: reservationStatus
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deletereservationStatus = async (request, response) => {
    try {
        const data = await reservationStatusModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete reservationStatus successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: reservationStatus not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
