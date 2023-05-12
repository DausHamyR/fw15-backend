const errorHandler = require("../../helpers/errorHandler.helper")
const reservationsModel = require("../../models/reservations.model")
const ticketsModel = require("../../models/reservationTickets.model")
const paymentModel = require("../../models/paymentMethod.model")
const sectionModel = require("../../models/reservationSections.model")

exports.createPayment = async (request, response) => {
    try {
        const {reservationId, paymentMethodId} = request.body
        const findReservation = await reservationsModel.findOne(reservationId)
        const findPaymentMethod = await paymentModel.findOne(paymentMethodId)
        const findQuantityTickets = await ticketsModel.findOneTickets()
        const section = await sectionModel.findOneSection(reservationId)
        if(!findReservation) {
            throw Error("reservations_not_found")
        }
        if(!findPaymentMethod) {
            throw Error("payment_not_available")
        }
        const result = {
            ticketSection: section.name,
            quantity: insertTickets.quantity,
            payment: findPaymentMethodId.name,
            payment: findPaymentMethodId.name,
        }
        // insertPayment
        return response.json({
            success: true,
            message: "Create payment successfully",
            results : result
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
