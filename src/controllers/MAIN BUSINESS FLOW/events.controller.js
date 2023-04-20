const errorHandler = require("../../helpers/errorHandler.helper")
const eventsModel = require("../../models/events.model")

exports.getEvents = async (request, response) => {
    try {
        const {id} = request.user
        const events = await eventsModel.findAllEvent(id)
        if(!events) {
            throw Error("events_not_found")
        }
        return response.json({
            success: true,
            message: "events",
            results: events
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
