const db = require("../helpers/db.helper")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "profile" 
WHERE "fullName" 
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
    SELECT * FROM "profile" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "profile" ("picture", "fullName", "phoneNumber", "gender", "profession", "nationality", "birthDate", "userId")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `
    const values = [data.picture, data.fullName, data.phoneNumber, data.gender, data.profession, data.nationality, data.birthDate, data.userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "profile"
    SET "picture"=$2, "fullName"=$3, "phoneNumber"=$4, "gender"=$5, "profession"=$6, "nationality"=$7, "birthDate"=$8, "userId"=$9
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.picture, data.fullName, data.phoneNumber, data.gender, data.profession, data.nationality, data.birthDate, data.userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "profile" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
