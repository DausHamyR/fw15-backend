const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "reservationTickets" 
WHERE "reservationId"::TEXT
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
    SELECT * FROM "reservationTickets" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByReservationId = async function (id) {
    const query = `
    SELECT * FROM "reservationTickets" WHERE "reservationId"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

// exports.findOne1 = async function (sectionId) {
//     const querySections = `
//     SELECT "name" FROM "reservationSections" WHERE id=$1`
//     const queryTickets = `
//     SELECT "quantity" FROM "reservationTickets" WHERE sectionId=$1
//     `
//     const sectionValues = [sectionId]
//     const ticketsValues = [sectionId]
//     const section = await db.query(querySections, sectionValues)
//     const tickets = await db.query(queryTickets, ticketsValues)
//     return {
//         section: section.rows[0].name,
//         tickets: tickets.rows[0].quantity
//     }
// }

exports.insert = async function (data) {
    const query = `
    INSERT INTO "reservationTickets" ("reservationId", "sectionId", "quantity")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.reservationId, data.sectionId, data.quantity]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertTickets = async function (reservationId, sectionId, quantity) {
    const query = `
    INSERT INTO "reservationTickets" ("reservationId", "sectionId", "quantity")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [reservationId, sectionId, quantity]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "reservationTickets"
    SET 
      "reservationId"=COALESCE(NULLIF($2::INTEGER, NULL), "reservationId"), 
      "sectionId"=COALESCE(NULLIF($3::INTEGER, NULL), "sectionId"), 
      "quantity"=COALESCE(NULLIF($4::INTEGER, NULL), "quantity")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.reservationId, data.sectionId, data.quantity]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "reservationTickets" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
