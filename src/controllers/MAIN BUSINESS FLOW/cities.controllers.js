const errorHandler = require("../../helpers/errorHandler.helper")
const citiesModel = require("../../models/cities.model")

exports.getCity = async (request, response) => {
    try {
        const city = await citiesModel.findAllCities(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        if(!city) {
            throw Error("city_not_found")
        }
        return response.json({
            success: true,
            message: "city",
            results: city
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
