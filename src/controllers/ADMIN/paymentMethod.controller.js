const paymentMethodModel = require("../../models/paymentMethod.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllpaymentMethod = async(request, response) => {
    try {
        const data = await paymentMethodModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(data){
            return response.json({
                success: true,
                message: "List of all paymentMethod",
                results: data
            })
        }
    }catch(err) {
        return errorHandler(response, err)
    }
    return response.status(404).json({
        success: false,
        message: "Error: List all paymentMethod not found",
    })
}

exports.getOnepaymentMethod = async(request, response) => {
    try {
        const data = await paymentMethodModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail paymentMethod",
                results: data
            })
        }
        errorHandler(response, data)
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.createpaymentMethod = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const paymentMethod = await paymentMethodModel.insert(data)
        return response.json({
            success: true,
            message: `Create paymentMethod ${request.body.email} successfully`,
            result: paymentMethod
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updatepaymentMethod = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const paymentMethod = await paymentMethodModel.update(request.params.id, data)
        if(!paymentMethod){
            throw Error("id_doesn't_exist")
        }
        return response.json({
            success: true,
            message: "Update paymentMethod successfully",
            results: paymentMethod
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.deletepaymentMethod = async (request, response) => {
    try {
        const data = await paymentMethodModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete paymentMethod successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: paymentMethod not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
