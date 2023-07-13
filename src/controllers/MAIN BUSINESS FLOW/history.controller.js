const errorHandler = require("../../helpers/errorHandler.helper")
const reservationModel = require("../../models/reservations.model")
const eventModel = require("../../models/events.model")
const reservationStatusModel = require("../../models/reservationStatus.model")
const paymentMethodModel = require("../../models/paymentMethod.model")

exports.getAllHistory = async (request, response) => {
    try {
        const {id} = request.user
        const histories = await reservationModel.findAllHistory(id)
        console.log(histories)
        const getEvent = await eventModel.findAllEvent(histories.eventId)
        const getStatusPayment = await reservationStatusModel.findAllHistory(histories.statusId)
        const getPaymentMethod = await paymentMethodModel.findOne(histories.paymentMethodId)
        const results = {
            title: getEvent.title,
            date: getEvent.date,
            status: getStatusPayment.name,
            paymentMethod: getPaymentMethod.name,
        }
        return response.json({
            success: true,
            message: "history",
            results
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
