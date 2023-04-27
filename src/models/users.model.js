const db = require("../helpers/db.helper")
const argon = require("argon2")

exports.findAll = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
SELECT * FROM "users" 
WHERE "email" 
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
    SELECT * FROM "users" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByPassword = async function (id) {
    const query = `
    SELECT password FROM "users" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByEmail = async function (email) {
    const query = `
    SELECT * FROM "users" WHERE email=$1
    `
    const values = [email]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "users" ("username", "email", "password")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.username, data.email, data.password]
    const {rows} = await db.query(query, values)
    return rows[0]
}

// exports.insert1 = async function (data) {
//     const query = `
//     INSERT INTO "users" ("username", "email", "password", "picture")
//     VALUES ($1, $2, $3, $4) RETURNING *
//     `
//     const values = [data.username, data.email, data.password, data.picture]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }

exports.update = async function (id, data) {
    const query = `
    UPDATE "users"
    SET "email"=COALESCE(NULLIF($2, ''), "email"), 
    "password"=COALESCE(NULLIF($3, ''), "password"), 
    "username"=COALESCE(NULLIF($4, ''), "username")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.email, data.password, data.username]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.updateChangePassword = async function (id, data) {
    const query = `
    UPDATE "users"
    SET "password"= $2
    WHERE "id"= $1
    RETURNING *
    `
    const hashPassword = await argon.hash(data.newPassword)
    const values = [id, hashPassword]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "users" WHERE "id"=$1 RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
