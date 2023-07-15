const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "events" 
WHERE "title" 
LIKE $3 
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllEvent = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.search = params.search || ""
    params.sort = params.sort || "id"
    params.sortBy = params.sortBy || "ASC"
    params.category = params.category || ""
    params.city = params.city || ""

    const offset = (params.page - 1) * params.limit

    const query = `
    SELECT
      "e"."id",
      "c"."name" "category",
      "e"."picture",
      "e"."title",
      "ci"."name" "location",
      "e"."date",
      "e"."createdAt",
      "e"."updatedAt"
    FROM "events" "e"
    JOIN "eventCategories" "ec" ON "ec"."eventId" = "e"."id"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    WHERE "e"."title" ILIKE $3 AND
    "c"."name"  ILIKE $4 AND
    "ci"."name" ILIKE $5
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
  `
    const values = [params.limit, offset, `%${params.search}%`, `%${params.category}%`, `%${params.city}%`]
    const { rows } = await db.query(query, values)
    return rows
}

exports.findAllEventId = async function (id) {
    const query = `
    SELECT * FROM "events" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllEventManage = async function (id) {
    const query = `
    SELECT 
    "e"."id",
    "e"."title",
    "e"."date",
    "c"."name",
    "e"."descriptions"
    FROM "events" as "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "e"."createdBy"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOneEventManage = async function (id, userId) {
    const query = `
    SELECT  
    "e"."id",
    "e"."title",
    "e"."date",
    "c"."name",
    "e"."descriptions"
    FROM "events" as "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "e"."id"=$2 AND "e"."createdBy"=$1
    `
    const values = [id, userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "events" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneName = async function (id) {
    const query = `
    SELECT "title" FROM "events" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByCreatedBy = async function (createdBy) {
    const query = `
    SELECT "id" FROM "events" WHERE "createdBy"=$1
    `
    const values = [createdBy]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneEvent = async function (id) {
    const query = `
    SELECT
      "e"."id",
      "e"."picture",
      "e"."title",
      "c"."name" "location",
      "e"."date",
      "e"."descriptions",
      "e"."createdAt",
      "e"."updatedAt"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "e"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data, userId) {
    const query = `
    INSERT INTO "events" ("picture", "title", "date", "cityId", "descriptions", "createdBy")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const queryEventCategories = `
    INSERT INTO "eventCategories" ("categoryId")
    VALUES ($1) RETURNING *`
    const valuesEventCategories = [data.category]
    const values = [data.picture, data.name, data.date, data.location, data.detail, userId]
    let eventResult, eventCategoryResult
    const eventRes = await db.query(query, values)
    eventResult = eventRes.rows[0]
    const eventCategoriesRes = await db.query(queryEventCategories, valuesEventCategories)
    eventCategoryResult = eventCategoriesRes.rows[0]
    return {event: eventResult, eventCategories: eventCategoryResult}
}

// exports.insert = async function (data) {
//     const query = `
//     INSERT INTO "events" ("picture", "title", "date", "cityId", "descriptions")
//     VALUES ($1, $2, $3, $4, $5) RETURNING *
//     `
//     const values = [data.picture, data.title, data.date, data.cityId, data.descriptions]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }

exports.insertEvent = async function (event, cities, sections, categories) {
    const queryEvent = `
    INSERT INTO "events" ("title", "descriptions", "date", "picture", "createdBy")
    VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const queryCities = `
    INSERT INTO "cities" ("name", "picture")
    VALUES($1, $2) RETURNING * `
    const querySections = `
    INSERT INTO "reservationSections" ("price")
    VALUES($1) RETURNING * `
    const queryCategories = `
    INSERT INTO "categories" ("name")
    VALUES($1) RETURNING * `

    const valuesEvent = [event.name, event.detail, event.date, event.picture, event.id]
    const valuesCities = [cities.location, cities.picture]
    const valuesSections = [sections.price]
    const valuesCategories = [categories.category]
    let eventResult, cityResult, sectionsResult, categoriesResult

    const eventRes = await db.query(queryEvent, valuesEvent)
    eventResult = eventRes.rows[0]

    const citiesRes = await db.query(queryCities, valuesCities)
    cityResult = citiesRes.rows[0]

    const sectionsRes = await db.query(querySections, valuesSections)
    sectionsResult = sectionsRes.rows[0]

    const categoriesRes = await db.query(queryCategories, valuesCategories)
    categoriesResult = categoriesRes.rows[0]

    return {event: eventResult, cities: cityResult, sections: sectionsResult, categories: categoriesResult}
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "events"
    SET 
      "picture"=COALESCE(NULLIF($2, NULL), "picture"), 
      "title"=COALESCE(NULLIF($3, ''), "title"), 
      "date"=COALESCE(NULLIF($4::DATE, NULL), "date"), 
      "cityId"=COALESCE(NULLIF($5::INTEGER, NULL), "cityId"), 
      "createdBy"=COALESCE(NULLIF($6::INTEGER, NULL), "createdBy"), 
      "descriptions"=COALESCE(NULLIF($7, ''), "descriptions")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.picture, data.title, data.date, data.cityId, data.createdBy, data.descriptions]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.updateEvent = async function (id, idParams, data) {
    const query = `
    UPDATE "events"
    SET
      "title"=COALESCE(NULLIF($3, ''), "title"),
      "descriptions"=COALESCE(NULLIF($4, ''), "descriptions"),
      "date"=COALESCE(NULLIF($5::DATE, NULL), "date"),
      "picture"=COALESCE(NULLIF($6, NULL), "picture"),
      "cityId"=COALESCE(NULLIF($7::INTEGER, NULL), "cityId")
    WHERE "createdBy"=$1 AND "id"=$2
    RETURNING *
  `
    const values = [id, idParams, data.name, data.detail, data.date, data.picture, data.location]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (eventId) {
    const query = `
    DELETE FROM events WHERE "id"=$1
    RETURNING *;
`
    const values = [eventId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
