const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "deviceToken" 
ORDER BY ${sort} ${sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [limit, offset]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
  SELECT * FROM "deviceToken" WHERE "userId"::TEXT=$1
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertToken = async function (id, data) {
    const query = `
  INSERT INTO "deviceToken" ("token", "userId")
  VALUES ($1, $2) RETURNING *
  `
    const values = [data.token, id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
