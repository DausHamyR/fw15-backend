const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "eventCategories" 
WHERE "eventId"::TEXT LIKE $3
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "eventCategories" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
// exports.findOneId = async function (eventId, categoryId) {
//     const query = `
//     SELECT * FROM "eventCategories" WHERE eventId=$1, categoryId=$2
//     `
//     const values = [eventId, categoryId]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }

exports.insert = async function (data) {
    const query = `
    INSERT INTO "eventCategories" ("eventId", "categoryId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.eventId, data.categoryId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertCategories = async function (findCategories, findEventId) {
    const query = `
    INSERT INTO "eventCategories" ("categoryId", "eventId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [findCategories,findEventId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, eventId) {
    const query = `
    UPDATE "eventCategories"
    SET "categoryId"=COALESCE(NULLIF($2::INTEGER, NULL), "categoryId")
    WHERE "eventId"=$1
    RETURNING *
  `
    const values = [id, eventId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "eventCategories" WHERE "eventId"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
