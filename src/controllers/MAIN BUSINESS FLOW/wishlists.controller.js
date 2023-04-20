const errorHandler = require("../../helpers/errorHandler.helper")
const wishlistsModel = require("../../models/wishlists.model")

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
