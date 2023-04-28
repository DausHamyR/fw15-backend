const errorHandler = require("../../helpers/errorHandler.helper")
const wishlistsModel = require("../../models/wishlists.model")
const eventModel = require("../../models/events.model")

exports.getWishlists = async (request, response) => {
    try {
        const {id} = request.user
        const wishlists = await wishlistsModel.findOneById(id)
        if(!wishlists) {
            throw Error("wishlists_not_found")
        }
        return response.json({
            success: true,
            message: "wishlists",
            results: wishlists
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.getAllWishlists = async (request, response) => {
    try {
        const wishlists = await wishlistsModel.findAllWishlists(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        if(wishlists) {
            return response.json({
                success: true,
                message: "wishlists",
                results: wishlists
            })
        }
        throw Error("wishlists_not_found")
          
    }catch(err) {
        return errorHandler(response, err)
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
        const cekEventId = await eventModel.findOne(eventId)
        const insertWishlists = await wishlistsModel.insert1(eventId, id)
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

