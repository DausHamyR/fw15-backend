const errorHandler = require("../../helpers/errorHandler.helper")
const reservationModel = require("../../models/reservations.model")

exports.getAllHistory = async (request, response) => {
    try {
        const {id} = request.user
        const histories = await reservationModel.findAllHistory(id)
        return response.json({
            success: true,
            message: "history",
            results: histories
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
