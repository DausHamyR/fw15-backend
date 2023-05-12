const eventsModel = require("../../models/events.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllevents = async(request, response) => {
    try {
        const data = await eventsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all events",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all events not found",
    })
}

exports.getOneevents = async(request, response) => {
    try {
        const data = await eventsModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail events",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createevents = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        const events = await eventsModel.insert(data)
        return response.json({
            success: true,
            message: `Create events ${request.body.email} successfully`,
            result: events
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.updateevents = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.filename
        }
        const events = await eventsModel.update(request.params.id, data)
        if(!events){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update events successfully",
            results: events
        })
    }catch(err) {
        fileRemover(request.file)
        errorHandler(response, err)
    }
}

exports.deleteevents = async (request, response) => {
    try {
        const data = await eventsModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete events successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: events not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
