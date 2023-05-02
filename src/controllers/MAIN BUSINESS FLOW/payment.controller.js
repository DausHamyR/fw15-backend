const errorHandler = require("../../helpers/errorHandler.helper")
const reservationsModel = require("../../models/reservations.model")
// const ticketsModel = require("../../models/reservationTickets.model")
const paymentModel = require("../../models/paymentMethod.model")
const sectionModel = require("../../models/reservationSections.model")

exports.createPayment = async (request, response) => {
    try {
        const {reservationId, paymentMethodId} = request.body
        const section = await sectionModel.findOneSection(reservationId)
        // const findReservationId = await ticketsModel.findOne(reservationId)
        const payment = await paymentModel.findOne(paymentMethodId)
        const insertPayment = await reservationsModel.insertPayment(paymentMethodId)
        if(!section) {
            throw Error("reservations_not_found")
        }
        if(!payment) {
            throw Error("payment_not_available")
        }
        const result = {
            reservation: section.name,
            payment: payment.name
        }
        insertPayment
        return response.json({
            success: true,
            message: "Create payment successfully",
            results : result
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
