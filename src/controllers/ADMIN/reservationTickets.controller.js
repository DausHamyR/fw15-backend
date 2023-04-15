const reservationTicketsModel = require("../../models/reservationTickets.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllreservationTickets = async(request, response) => {
    try {
        const data = await reservationTicketsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all reservationTickets",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all reservationTickets not found",
    })
}

exports.getOnereservationTickets = async(request, response) => {
    try {
        const data = await reservationTicketsModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail reservationTickets",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createreservationTickets = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservationTickets = await reservationTicketsModel.insert(data)
        return response.json({
            success: true,
            message: `Create reservationTickets ${request.body.email} successfully`,
            result: reservationTickets
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updatereservationTickets = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservationTickets = await reservationTicketsModel.update(request.params.id, data)
        return response.json({
            success: true,
            message: "Update reservationTickets successfully",
            results: reservationTickets
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deletereservationTickets = async (request, response) => {
    try {
        const data = await reservationTicketsModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete reservationTickets successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: reservationTickets not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
