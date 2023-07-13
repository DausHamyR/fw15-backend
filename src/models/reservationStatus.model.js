const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "reservationStatus" 
WHERE "name" 
LIKE $3 
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllHistory = async function (page, limit, search, sort, sortBy) {
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
"e"."date",
"c"."name" "category",
"e"."createdAt",
"e"."updatedAt"
FROM "events" "e"
JOIN "eventCategories" "ec" ON "ec"."eventId" = "e"."id"
JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
WHERE "e"."id"::TEXT
LIKE $3 
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllHistoryStatus = async function (id) {
    const query = `
    SELECT * FROM "reservationStatus" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "reservationStatus" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneById = async function (id) {
    const query = `
    SELECT
    "status"."name" "Payment Status",
    "section"."name" "Ticket Section",
    "tickets"."quantity",
    '$' || ("section"."price"::INTEGER * "tickets"."quantity") "Total Payment"
    FROM "reservationStatus" "status"
    JOIN "reservationSections" "section" ON "section"."id" = "status"."id"
    JOIN "reservationTickets" "tickets" ON "tickets"."reservationId" = "status"."id"
    WHERE "status"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "reservationStatus" ("name")
    VALUES ($1) RETURNING *
    `
    const values = [data.name]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "reservationStatus"
    SET "name"=COALESCE(NULLIF($2, ''), "name")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.name]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "reservationStatus" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
