const errorHandler = require("../../helpers/errorHandler.helper")
const partnersModel = require("../../models/partners.model")

exports.getPartners = async (request, response) => {
    try {
        const partners = await partnersModel.findAllPartners(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
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
