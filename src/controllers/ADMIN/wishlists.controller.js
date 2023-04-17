const wishlistsModel = require("../../models/wishlists.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllwishlists = async(request, response) => {
    try {
        const data = await wishlistsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all wishlists",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all wishlists not found",
    })
}

exports.getOnewishlists = async(request, response) => {
    try {
        const data = await wishlistsModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail wishlists",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createwishlists = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const wishlists = await wishlistsModel.insert(data)
        return response.json({
            success: true,
            message: `Create wishlists ${request.body.email} successfully`,
            result: wishlists
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updatewishlists = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const wishlists = await wishlistsModel.update(request.params.id, data)
        if(!wishlists){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update wishlists successfully",
            results: wishlists
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deletewishlists = async (request, response) => {
    try {
        const data = await wishlistsModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete wishlists successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: wishlists not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
