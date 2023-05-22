const errorHandler = require("../../helpers/errorHandler.helper")
const categoriesModel = require("../../models/categories.model")

exports.getCategories = async (request, response) => {
    try {
        const categories = await categoriesModel.findAllCategories(request.query)
        if(!categories) {
            throw Error("categories_not_found")
        }
        return response.json({
            success: true,
            message: "categories",
            results: categories
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.getAllCategories = async (request, response) => {
    try {
        const categories = await categoriesModel.findAll(request.query)
        if(!categories) {
            throw Error("categories_not_found")
        }
        return response.json({
            success: true,
            message: "categories",
            results: categories
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
