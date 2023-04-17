const reservationSectionsModel = require("../../models/reservationSections.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllreservationSections = async(request, response) => {
    try {
        const data = await reservationSectionsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all reservationSections",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all reservationSections not found",
    })
}

exports.getOnereservationSections = async(request, response) => {
    try {
        const data = await reservationSectionsModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail reservationSections",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createreservationSections = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservationSections = await reservationSectionsModel.insert(data)
        return response.json({
            success: true,
            message: `Create reservationSections ${request.body.email} successfully`,
            result: reservationSections
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updatereservationSections = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const reservationSections = await reservationSectionsModel.update(request.params.id, data)
        if(!reservationSections){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update reservationSections successfully",
            results: reservationSections
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deletereservationSections = async (request, response) => {
    try {
        const data = await reservationSectionsModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete reservationSections successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: reservationSections not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
