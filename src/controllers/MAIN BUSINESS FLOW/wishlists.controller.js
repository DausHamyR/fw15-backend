const errorHandler = require("../../helpers/errorHandler.helper")
const wishlistsModel = require("../../models/wishlists.model")
const eventModel = require("../../models/events.model")

exports.getWishlists = async (request, response) => {
    try {
        const wishlists = await wishlistsModel.findAllWishlists(
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

exports.deletewishlists = async (request, response) => {
    try {
        const data = await wishlistsModel.destroy(request.params.id)
        if(data) {
            return response.json({
                success: true,
                message: "Delete wishlists successfully",
                result: data
            })
        }
        return response.status(404).json({
            success: false,
            message: "Error: wishlists not found",
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

// exports.createInsertWishlists = async (request, response) => {
//     try {
//         const {title, name, date} = request.body
//         const cities = {name}
//         const wishlists = await wishlistsModel.insertWishlists({title, date}, cities)
//         const result = {
//             title: wishlists.event.title,
//             name: wishlists.cities.name,
//             date: wishlists.event.date
//         }
//         return response.json({
//             success: true,
//             message: `Create wishlists ${title} successfully`,
//             result
//         })
//     }catch(err) {
//         errorHandler(response, err)
//     }
// }

exports.createInsertWishlists = async (request, response) => {
    try {
        const {id} = request.user
        const {eventId} = request.body
        const insertEvent = await eventModel.update(eventId, {createdBy: id})
        const cekEventId = await eventModel.findOne(eventId)
        console.log(insertEvent)
        const insertWishlists = await wishlistsModel.insertWishlists(eventId, id)
        if(!cekEventId) {
            throw Error("event_not_found")
        }else {
            insertWishlists
            return response.json({
                success: true,
                message: "Create wishlists successfully",
                results: cekEventId
            })
        }
    }catch(err) {
        errorHandler(response, err)
    }
}

