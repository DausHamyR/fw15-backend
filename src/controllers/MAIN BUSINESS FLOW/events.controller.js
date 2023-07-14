const errorHandler = require("../../helpers/errorHandler.helper")
const eventsModel = require("../../models/events.model")
const citiesModel = require("../../models/cities.model")
const eventCategoriesModel = require("../../models/eventCategories.model")
const sectionsModel = require("../../models/reservationSections.model")
const categoriesModel = require("../../models/categories.model")
const deviceTokenModel = require("../../models/deviceToken.model")
const admin = require("../../helpers/firebase")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllEventsManage = async (request, response) => {
    try {
        const {id} = request.user
        const events = await eventsModel.findAllEventManage(id)
        return response.json({
            success: true,
            message: "events",
            results: events
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.getDetailEventsManage = async (request, response) => {
    try {
        const {id} = request.user
        const userId = request.params.id
        const events = await eventsModel.findOneEventManage(id, userId)
        return response.json({
            success: true,
            message: "events",
            results: events
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.getEvents = async (request, response) => {
    try {
        const events = await eventsModel.findAllEvent(request.query)
        return response.json({
            success: true,
            message: "events",
            results: events
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

// exports.getEvents = async (request, response) => {
//     try {
//         const events = await eventsModel.findAllEvent(request.query)
//         return response.json({
//             success: true,
//             message: "events",
//             results: events
//         })
//     }catch(err) {
//         return errorHandler(response, err)
//     }
// }

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

exports.updateEvent = async (request, response) => {
    try {
        const {id} = request.query
        // const user = await eventsModel.findOneEvent(id)
        const data = {
            ...request.body
        }
        if(request.file) {
            if(data.picture) {
                // fileRemover({filename: user.picture})
            }
            data.picture = request.file.path
            // data.picture = request.file.filename
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
        const {id} = request.user
        const data = {
            ...request.body
        }
        if(request.file) {
            data.picture = request.file.path
        }
        const createEvent = await eventsModel.insert(data, id)
        const idEvent = createEvent.event.id
        const idEventCategories = createEvent.eventCategories.id
        const createEventCategories = await eventCategoriesModel.update(idEventCategories, idEvent)
        const results = [createEvent.event, createEventCategories]
        const listToken = await deviceTokenModel.findAll(1, 1000)
        const message = listToken.map(item => ({token: item.token, notification:{title: `there is a new event ${data.name}, let's register immediately`, body: "new event join and enliven"}}))
        const messaging = admin.messaging()
        messaging.sendEach(message)
        return response.json({
            success: true,
            message: `Create Events ${data.name} successfully`,
            results
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
// exports.createInsertEvent = async (request, response) => {
//     try {
//         const {id} = request.user
//         let {name, location, price, category, date, picture, detail} = request.body
//         if(request.file) {
//             // picture = request.file.filename
//             picture = request.file.path
//         }
//         const cities = {location, picture}
//         const sections = {price}
//         const categories = {category}
//         const createEvent = await eventsModel.insertEvent({name, detail, date, picture, id}, cities, sections, categories)
//         const updateEvent = await eventsModel.update(createEvent.event.id, { cityId: createEvent.cities.id })
//         const findEventId = await eventsModel.findOneByCreatedBy(createEvent.event.createdBy)
//         const findCategoriesId = await categoriesModel.findOne(createEvent.categories.id)
//         const insertEventCategory = await eventCategoriesModel.insertCategories(findEventId.id, findCategoriesId.id)

//         const result = {
//             name: createEvent.event.title,
//             location: createEvent.cities.name,
//             price: createEvent.sections.price,
//             category: createEvent.categories.name,
//             date: createEvent.event.date,
//             picture: createEvent.event.picture,
//             detail: createEvent.event.descriptions
//         }
//         updateEvent
//         insertEventCategory
//         const listToken = await deviceTokenModel.findAll(1, 1000)
//         const message = listToken.map(item => ({token: item.token, notification:{title: `there is a new event ${name}, let's register immediately`, body: "new event join and enliven"}}))
//         const messaging = admin.messaging()
//         messaging.sendEach(message)
//         return response.json({
//             success: true,
//             message: `Create Events ${name} successfully`,
//             result
//         })
//     }catch(err) {
//         errorHandler(response, err)
//     }
// }

exports.deleteManageEvent = async (request, response) => {
    try {
        const eventId = request.params.id
        const data = await eventsModel.destroy(eventId)
        const dataCategories = await eventCategoriesModel.destroy(data.id)
        const results = [data, dataCategories]
        return response.json({
            success: true,
            message: "Delete Event successfully",
            results
        })
    }catch(err) {
        errorHandler(response, err)
    }
}
