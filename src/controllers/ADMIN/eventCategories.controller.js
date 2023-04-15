const eventCategoriesModel = require("../../models/eventCategories.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllEventCategories = async(request, response) => {
    try {
        const data = await eventCategoriesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all eventCategories",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all eventCategories not found",
    })
}

exports.getOneEventCategories = async(request, response) => {
    try {
        const data = await eventCategoriesModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail eventCategories",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createEventCategories = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const eventCategories = await eventCategoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Create eventCategories successfully",
            result: eventCategories
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updateEventCategories = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const eventCategories = await eventCategoriesModel.update(request.params.id, data)
        return response.json({
            success: true,
            message: "Update eventCategories successfully",
            results: eventCategories
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deleteEventCategories = async (request, response) => {
    try {
        const data = await eventCategoriesModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete eventCategories successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: eventCategories not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
