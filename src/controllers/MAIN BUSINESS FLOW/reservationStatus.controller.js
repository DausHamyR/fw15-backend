const errorHandler = require("../../helpers/errorHandler.helper")
const reservationStatusModel = require("../../models/reservationStatus.model")

exports.getReservationStatus = async (request, response) => {
    try {
        const {id} = request.user
        const reservationStatus = await reservationStatusModel.findOneById(id)
        if(!reservationStatus) {
            throw Error("reservationStatus_not_found")
        }
        return response.json({
            success: true,
            message: "reservationStatus",
            results: reservationStatus
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
