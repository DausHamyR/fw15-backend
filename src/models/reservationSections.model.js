const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "reservationSections" 
WHERE "name" 
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
    SELECT * FROM "reservationSections" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneSection = async function (sectionId) {
    const query = `
    SELECT "name","price" FROM "reservationSections" WHERE "id"=$1
    `
    const values = [sectionId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "reservationSections" ("name", "price")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.name, data.price]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "reservationSections"
    SET 
      "name"=COALESCE(NULLIF($2, ''), "name"),
      "price"=COALESCE(NULLIF($3, ''), "price")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.name, data.price]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "reservationSections" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
