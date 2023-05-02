const errorHandler = require("../../helpers/errorHandler.helper")
const eventsModel = require("../../models/events.model")
const citiesModel = require("../../models/cities.model")
// const eventCategoriesModel = require("../../models/eventCategories.model")
const sectionsModel = require("../../models/reservationSections.model")
const categoriesModel = require("../../models/categories.model")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getEvents = async (request, response) => {
    try {
        const events = await eventsModel.findAllEvent(  
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy)
            
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
            throw Error("event_not_found")
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

exports.createInsertEventt = async (request, response) => {
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
        let updatedCities, updatedSections, updatedCategories
        if(data.location) {
            updatedCities = await citiesModel.update(id, data)
        }else {
            updatedCities = await citiesModel.findOne(id)
        }
        if(data.price) {
            updatedSections  = await sectionsModel.update(id, data)
        }else {
            updatedSections = await sectionsModel.findOne(id)
        }
        if(data.category) {
            updatedCategories = await categoriesModel.update(id, data)
        }else {
            updatedCategories = await categoriesModel.findOne(id)
        }
        const results = {
            name: updateEvent.title,
            location: updatedCities?.name,
            price: updatedSections?.price,
            category: updatedCategories.name,
            date: updateEvent.date,
            picture: updateEvent.picture,
            detail: updateEvent.descriptions
        }
        return response.json({
            success: true,
            message: "Event updated",
            results
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.createInsertEvent = async (request, response) => {
    try {
        let {name, location, price, category, date, picture, detail} = request.body
        if(request.file) {
            picture = request.file.filename
        }
        const cities = {location}
        const sections = {price}
        const categories = {category}
        const createEvent = await eventsModel.insertEvent({name, detail, date, picture}, cities, sections, categories)

        const result = {
            name: createEvent.event.title,
            location: createEvent.cities.name,
            price: createEvent.sections.price,
            category: createEvent.categories.name,
            date: createEvent.event.date,
            picture: createEvent.event.picture,
            detail: createEvent.event.descriptions
        }
        return response.json({
            success: true,
            message: `Create wishlists ${name} successfully`,
            result
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
