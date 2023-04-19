const errorHandler = require("../../helpers/errorHandler.helper")
const partnersModel = require("../../models/partners.model")

exports.getPartners = async (request, response) => {
    try {
        const {id} = request.user
        const partners = await partnersModel.findOneById(id)
        if(!partners) {
            throw Error("partners_not_found")
        }
        return response.json({
            success: true,
            message: "partners",
            results: partners
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
