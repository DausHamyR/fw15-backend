const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "reservations" 
WHERE "eventId"::TEXT
LIKE $3 
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllByUserId = async function (id, params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.search = params.search || ""
    params.sort = (params.sort && `"e"."${params.sort}"`) || "\"r\".\"id\""
    params.sortBy = params.sortBy || "ASC"
    params.city = params.city || ""

    const offset = (params.page - 1) * params.limit

    const query = `
SELECT "r"."id", "e"."title", "ci"."name" as location, "e"."date" 
FROM "reservations" "r"
JOIN "events" "e" ON "e"."id" = "r"."eventId"
JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
WHERE "r"."userId"::TEXT = $5   
AND "e"."title" LIKE $3
AND "ci"."name" LIKE $4
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [params.limit, offset, `%${params.search}%`, `%${params.city}%`, id]
    const {rows} = await db.query(query, values)
    return rows
}

// exports.findAllReservations = async function (page, limit, search, sort, sortBy) {
//     page = parseInt(page) || 1
//     limit = parseInt(limit) || 5
//     search = search || ""
//     sort = sort || "eventId"
//     sortBy = sortBy || "ASC"

//     const offset = (page - 1) * limit

//     const query = `
// SELECT
// "r"."eventId",
// "r"."statusId",
// "r"."paymentMethodId",
// "r"."createdAt",
// "r"."updatedAt"
// FROM "reservations" "r"
// WHERE "r"."eventId"::TEXT
// LIKE $3 
// ORDER BY ${sort} ${sortBy} 
// LIMIT $1 OFFSET $2
// `
//     const values = [limit, offset, `%${search}%`]
//     const {rows} = await db.query(query, values)
//     return rows
// }

exports.findAllHistory = async function (id) {
    const query = `
    SELECT 
    "reservations"."id",
    "events"."title",
    "events"."date",
    "reservationStatus"."name",
    "paymentMethod"."name" as "namePayment",
    "reservations"."createdAt",
    "reservations"."updatedAt"
    FROM "reservations"
    JOIN "events" ON "events"."id" = "reservations"."eventId"
    JOIN "reservationStatus" ON "reservationStatus"."id" = "reservations"."statusId"
    JOIN "paymentMethod" ON "paymentMethod"."id" = "reservations"."paymentMethodId"
    WHERE "reservations"."userId"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "reservations" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findReservations = async function (eventId) {
    const query = `
  SELECT
  "e"."title",
  "rsec"."name",
  "rsec"."price",
  "rt"."quantity"
  FROM "reservations" "r"
  JOIN "events" "e" ON "e"."id" = "r"."eventId"
  JOIN "reservationSections" "rsec" ON "rsec"."id" = "rt"."sectionId"
  JOIN "reservationTickets" "rt" ON "r"."id" = "rt"."sectionId"
  WHERE "r"."eventId"=$1
  `
    const values = [eventId]
    const {rows} = await db.query(query, values)
    return rows
}


exports.insert = async function (data) {
    const query = `
    INSERT INTO "reservations" ("eventId", "userId", "statusId", "paymentMethodId")
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [data.eventId, data.userId, data.statusId, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertPayment = async function (eventId, userId, statusId, paymentMethodId) {
    const query = `
    INSERT INTO "reservations" ("eventId, userId, statusId, paymentMethodId")
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [eventId, userId, statusId, paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertReservations = async function (eventId, userId, statusId) {
    const query = `
    INSERT INTO "reservations" ("eventId", "userId", "statusId")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [eventId, userId, statusId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "reservations"
    SET 
      "eventId"=COALESCE(NULLIF($2::INTEGER, NULL), "eventId"), 
      "userId"=COALESCE(NULLIF($3::INTEGER, NULL), "userId"), 
      "statusId"=COALESCE(NULLIF($4::INTEGER, NULL), "statusId"), 
      "paymentMethodId"=COALESCE(NULLIF($5::INTEGER, NULL), "paymentMethodId")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.eventId, data.userId, data.statusId, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "reservations" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
