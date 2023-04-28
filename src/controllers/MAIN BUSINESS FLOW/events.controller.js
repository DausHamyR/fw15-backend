const errorHandler = require("../../helpers/errorHandler.helper")
const eventsModel = require("../../models/events.model")
const fileRemover = require("../../helpers/fileRemover.helper")

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

exports.getOneEvents = async (request, response) => {
    try {
        const {id} = request.params
        const events = await eventsModel.findOneEvent(id)
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

exports.createInsertEvent = async (request, response) => {
    try {
        let {title, descriptions, date, picture, location, price, category} = request.body
        if(request.file) {
            picture = request.file.filename
        }
        const cities = {location}
        const sections = {price}
        const categories = {category}
        const createEvent = await eventsModel.insertEvent({title, descriptions, date, picture}, cities, sections, categories)
        const result = {
            title: createEvent.event.title,
            descriptions: createEvent.event.descriptions,
            date: createEvent.event.date,
            picture: createEvent.event.picture,
            location: createEvent.cities.location,
            sections: createEvent.sections.price,
            category: createEvent.categories.category
        }
        return response.json({
            success: true,
            message: `Create wishlists ${title} successfully`,
            result
        })
    }catch(err) {
        errorHandler(response, err)
    }
}

exports.updateEvent = async (request, response) => {
    try {
        const {id} = request.user
        const user = await eventsModel.findOneEvent(id)
        const data = {
            ...request.body
        }
        if(request.file) {
            if(user.picture) {
                fileRemover({filename: user.picture})
            }
            data.picture = request.file.filename
        }
        const updateEvent = await eventsModel.updateEvent(id, data)
        if(!updateEvent) {
            throw Error("update_event_failed")
        }
        return response.json({
            success: true,
            message: "Event updated",
            results: updateEvent
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
