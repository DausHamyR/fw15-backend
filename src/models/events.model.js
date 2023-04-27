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

exports.findAllEvent = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "title"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
    SELECT
      "e"."id",
      "e"."title",
      "ci"."name" "location",
      "c"."name" "category",
      "e"."descriptions",
      "e"."date",
      "e"."createdAt",
      "e"."updatedAt"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "e"."eventId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    WHERE "e"."title"::TEXT
    LIKE $3 
    ORDER BY ${sort} ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "events" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneEvent = async function (cityId) {
    const query = `
    SELECT
      "e"."id",
      "e"."title",
      "c"."name" "location",
      "sections"."price",
      "e"."descriptions",
      "caries"."name" "category",
      "e"."date",
      "e"."picture"
    FROM "events" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    JOIN "reservationSections" "sections" ON "sections"."id" = "e"."cityId"
    JOIN "categories" "caries" ON "caries"."id" = "e"."cityId"
    WHERE "e"."cityId"=$1
    `
    const values = [cityId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "events" ("picture", "title", "date", "cityId", "descriptions")
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `
    const values = [data.picture, data.title, data.date, data.cityId, data.descriptions]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertEvent = async function (event, cities, sections, categories) {
    const queryEvent = `
    INSERT INTO "events" ("title", "descriptions", "date", "picture")
    VALUES ($1, $2, $3, $4) RETURNING *`
    const queryCities = `
    INSERT INTO "cities" ("name")
    VALUES($1) RETURNING * `
    const querySections = `
    INSERT INTO "reservationSections" ("price")
    VALUES($1) RETURNING * `
    const queryCategories = `
    INSERT INTO "categories" ("name")
    VALUES($1) RETURNING * `

    const valuesEvent = [event.title, event.descriptions, event.date, event.picture]
    const valuesCities = [cities.location]
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
      "descriptions"=COALESCE(NULLIF($6, ''), "descriptions")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.picture, data.title, data.date, data.cityId, data.descriptions]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.updateEvent = async function (cityId, data) {
    const query = `
    UPDATE "events"
    SET
      "title"=COALESCE(NULLIF($2, ''), "title"),
      "descriptions"=COALESCE(NULLIF($3, ''), "descriptions"),
      "date"=COALESCE(NULLIF($4::DATE, NULL), "date"),
      "picture"=COALESCE(NULLIF($5, NULL), "picture")
    WHERE "cityId"=$1
    RETURNING *
  `
    const values = [cityId, data.title, data.descriptions, data.date, data.picture]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "events" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
