const errorHandler = require("../../helpers/errorHandler.helper")
const reservationsModel = require("../../models/reservations.model")
const sectionsModel = require("../../models/reservationSections.model")
const ticketsModel = require("../../models/reservationTickets.model")
const eventsModel = require("../../models/events.model")

exports.createInsertReservations = async (request, response) => {
    try {
        const {id} = request.user
        const statusId = 1
        const {eventId, sectionId, quantity} = request.body
        const {id: events} = await eventsModel.findOne(eventId) //mencari event yang ada
        const insertReservations = await reservationsModel.insertReservations(eventId, id, statusId)
        const insertTickets = await ticketsModel.insertTickets(insertReservations.id, sectionId, quantity)
        const section = await sectionsModel.findOneSection(sectionId)
        // const reservation = await reservationsModel.findOne(eventId)
        // const tickets = await ticketsModel.findOneTickets(quantity)
        if(!events) {
            throw Error("event_not_found")
        }
        if(!section) {
            throw Error("section_not_found")
        }
        const total = section.price * quantity
        const results = {
            reservationId: insertTickets.id,
            ticketSection: section.name,
            quantity: insertTickets.quantity,
            totalPayment: `$${total}`
        }

        if(!results) {
            throw Error("reservations_not_found")
        }else {
            insertReservations
            insertTickets
            return response.json({
                success: true,
                message: "Create reservations successfully",
                results
            })
        }
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.getReservation = async (request, response) => {
    try {
        const reservations = await reservationsModel.findAllReservations()
        if(!reservations) {
            throw Error("reservations_not_found")
        }
        return response.json({
            success: true,
            message: "reservations",
            results: reservations
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

// exports.createInsertReservations = async (request, response) => {
//     try {
//         const {eventId, sectionId, quantity} = request.body
//         const sections = await sectionsModel.findOne(sectionId)
//         const total = sections.price * quantity
//         const insertReservations = await reservationsModel.insert1(eventId, sectionId, quantity)

//         if(!cekReservationTickets) {
//             throw Error("reservations_not_found")
//         }else {
//             insertReservations
//             return response.json({
//                 success: true,
//                 message: "Create reservations successfully",
//                 results: cekReservationTickets
//             })
//         }
//     }catch(err) {
//         errorHandler(response, err)
//     }
// }
