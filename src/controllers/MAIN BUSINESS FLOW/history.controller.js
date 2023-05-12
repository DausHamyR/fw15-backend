const errorHandler = require("../../helpers/errorHandler.helper")
const reservationStatusModel = require("../../models/reservationStatus.model")

exports.getHistory = async (request, response) => {
    try {
        const wishlists = await reservationStatusModel.findAllHistory(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        
        return response.json({
            success: true,
            message: "wishlists",
            results: wishlists
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
