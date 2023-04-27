const errorHandler = require("../../helpers/errorHandler.helper")
const citiesModel = require("../../models/cities.model")

exports.getCity = async (request, response) => {
    try {
        const {id} = request.user
        const city = await citiesModel.findAllCities(id)
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
