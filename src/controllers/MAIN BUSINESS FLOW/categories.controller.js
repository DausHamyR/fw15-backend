const errorHandler = require("../../helpers/errorHandler.helper")
const categoriesModel = require("../../models/categories.model")

exports.getCategories = async (request, response) => {
    try {
        const {id} = request.user
        const categories = await categoriesModel.findOneById(id)
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
