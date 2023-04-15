const categoriesModel = require("../../models/categories.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllCategories = async(request, response) => {
    try {
        const data = await categoriesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all categories",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all categories not found",
    })
}

exports.getOneCategories = async(request, response) => {
    try {
        const data = await categoriesModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail Categories",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createCategories = async (request, response) => {
    try {
        const user = await categoriesModel.insert(request.body)
        return response.json({
            success: true,
            message: `Create categories ${request.body.name} successfully`,
            result: user
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updateCategories = async (request, response) => {
    try {
        const user = await categoriesModel.update(request.params.id, request.body)
        return response.json({
            success: true,
            message: "Update categories successfully",
            results: user
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deleteCategories = async (request, response) => {
    try {
        const data = await categoriesModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete categories successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: categories not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
