const errorHandler = require("../../helpers/errorHandler.helper")
const reservationsModel = require("../../models/reservations.model")
const ticketsModel = require("../../models/reservationTickets.model")
const paymentModel = require("../../models/paymentMethod.model")
const sectionModel = require("../../models/reservationSections.model")
const eventModel = require("../../models/events.model")

exports.getAllPayment = async(req, res) => {
    const methodData = await paymentModel.findAll2()
    return res.json({
        success: true,
        message: "Ok",
        results: methodData
    })
}

exports.createPayment = async (request, response) => {
    try {
        const {id:userId} = request.user
        const statusId = 2
        const {reservationId, paymentMethodId, quantity} = request.body
        const findReservation = await reservationsModel.findOne(reservationId)
        if(findReservation.userId !== userId) {
            throw Error("unauthorized")
        }
        const update = await reservationsModel.update(reservationId, {paymentMethodId, statusId})
        const findPaymentMethod = await paymentModel.findOne(paymentMethodId)
        const findTickets = await ticketsModel.findOneByReservationId(update.id)
        const section = await sectionModel.findOne(findTickets.sectionId)
        const findEvent = await eventModel.findOne(update.eventId)
        if(!findReservation) {
            throw Error("reservations_not_found")
        }
        if(!findPaymentMethod) {
            throw Error("payment_not_available")
        }
        const result = {
            id: findReservation.id,
            events: findEvent.title,
            ticketSection: section.name,
            quantity: quantity,
            pricePerTicket: section.price,
            totalPrice: findTickets.quantity * section.price,
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
