const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "wishlists" 
WHERE "eventId"::TEXT
LIKE $3 
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllWishlists = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "title"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT
"e"."title",
"c"."name",
"e"."date",
"w"."createdAt",
"w"."updatedAt"
FROM "wishlists" "w"
JOIN "events" "e" ON "e"."id" = "w"."eventId"
JOIN "users" "u" ON "u"."id" = "w"."userId"
JOIN "cities" "c" ON "c"."id" = "w"."userId"
WHERE "w"."eventId"::TEXT
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
    SELECT * FROM "wishlists" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneById = async function (id) {
    const query = `
    SELECT
    "e"."title",
    "c"."name",
    "e"."date",
    "w"."createdAt",
    "w"."updatedAt"
    FROM "wishlists" "w"
    JOIN "events" "e" ON "e"."id" = "w"."eventId"
    JOIN "users" "u" ON "u"."id" = "w"."userId"
    JOIN "cities" "c" ON "c"."id" = "w"."userId"
    WHERE "w".id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "wishlists" ("eventId", "userId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.eventId, data.userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert1 = async function (eventId, userId) {
    const query = `
    INSERT INTO "wishlists" ("eventId", "userId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [eventId, userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertWishlists = async function (event, cities) {
    const queryEvents = `
    INSERT INTO
    "events" ("title", "date") VALUES ($1, $2)
    RETURNING *
    `
    const queryCities = `
    INSERT INTO
    "cities" ("name") VALUES ($1)
    RETURNING *
    `
    const valuesEvents = [event.title, event.date]
    const valuesCities = [cities.name]
    let eventResult, cityResult

    const eventRes = await db.query(queryEvents, valuesEvents)
    eventResult = eventRes.rows[0]

    const citiesRes = await db.query(queryCities, valuesCities)
    cityResult = citiesRes.rows[0]

    return {event: eventResult, cities: cityResult}
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "wishlists"
    SET "eventId"=$2, "userId"=$3
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.eventId, data.userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "wishlists" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
