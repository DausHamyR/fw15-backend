const errorHandler = require("../../helpers/errorHandler.helper")
const reservationModel = require("../../models/reservations.model")

exports.getAllHistory = async (request, response) => {
    try {
        const {id: userId} = request.user
        const histories = await reservationModel.findAllByUserId(userId, request.query)
        
        return response.json({
            success: true,
            message: "wishlists",
            results: histories
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
