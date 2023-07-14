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

exports.getOneWishlist = async (request, response) => {
    try {
        const {id} = request.user
        const eventId = request.params.id
        const wishlist = await wishlistsModel.findOneById(eventId, id)
        if(!wishlist) {
            throw Error("wishlist_not_found")
        }
        return response.json({
            success: true,
            message: "wishlist",
            results: wishlist
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.deletewishlists = async (request, response) => {
    try {
        const {id} = request.user
        const eventId = request.params.id
        const cekWishlist = await wishlistsModel.findOneDelete(id, eventId)
        if(!cekWishlist){
            throw Error("wishlist_not_found")
        }
        const data = await wishlistsModel.destroy(id, eventId)
        if(data) {
            return response.json({
                success: true,
                message: "Delete wishlists successfully",
                result: data
            })
        }
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
        console.log('1')
        console.log(id, eventId, 'cek')
        const insertEvent = await eventModel.update(eventId, {createdBy: id})
        console.log('2')
        const cekEventId = await eventModel.findOne(eventId)
        console.log(insertEvent, '3')
        const insertWishlists = await wishlistsModel.insertWishlists(eventId, id)
        console.log('4')
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

