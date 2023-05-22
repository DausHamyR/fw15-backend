const db = require("../helpers/db.helper")

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.search = params.search || ""
    params.sort = params.sort || "id"
    params.sortBy = params.sortBy || "ASC"

    const offset = (params.page - 1) * params.limit

    const query = `
SELECT * FROM "categories" 
WHERE "name" 
LIKE $3 
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [params.limit, offset, `%${params.search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findAllCategories = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 999
    params.search = params.search || ""
    params.sort = params.sort || "name"
    params.sortBy = params.sortBy || "ASC"

    const offset = (params.page - 1) * params.limit

    const query = `
SELECT
"c"."name",
"e"."picture",
"e"."title",
"e"."date",
"c"."createdAt",
"c"."updatedAt"
FROM "eventCategories" "ec"
JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
JOIN "events" "e" ON "e"."id" = "ec"."eventId"
WHERE "c"."name"
LIKE $3 
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [params.limit, offset, `%${params.search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "categories" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneId = async function (id) {
    const query = `
    SELECT "id" FROM "categories" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneById = async function (id) {
    const query = `
    SELECT
    "c"."name",
    "e"."picture",
    "e"."title",
    "e"."date",
    "c"."createdAt",
    "c"."updatedAt"
    FROM "categories" "c"
    JOIN "events" "e" ON "c"."id" = "e"."id"
    WHERE "c"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "categories" ("name")
    VALUES ($1) RETURNING *
    `
    const values = [data.name]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "categories"
    SET "name"=$2
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.name]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "categories" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
