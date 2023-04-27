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
    SELECT * FROM "profile" WHERE "id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByUserId = async function (userId) {
    const query = `
    SELECT
    "u"."id",
    "p"."picture",
    "p"."fullName",
    "u"."username",
    "u"."email",
    "p"."phoneNumber",
    "p"."gender",
    "p"."profession",
    "p"."nationality",
    "p"."birthDate",
    "p"."createdAt",
    "p"."updatedAt"
    FROM "profile" "p"
    JOIN "users" "u" ON "u"."id" = "p"."userId"
    WHERE "p"."userId"=$1
    `
    const values = [userId]
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
    SET "picture"=COALESCE(NULLIF($2, NULL), "picture"), 
    "fullName"=COALESCE(NULLIF($3, ''), "fullName"),
    "phoneNumber"=COALESCE(NULLIF($4, ''), "phoneNumber"), 
    "gender"=COALESCE(NULLIF($5::BOOLEAN, NULL), "gender"), 
    "profession"=COALESCE(NULLIF($6, ''), "profession"), 
    "nationality"=COALESCE(NULLIF($7, ''), "nationality"), 
    "birthDate"=COALESCE(NULLIF($8::DATE, 'now'), "birthDate"),
    "userId"=COALESCE(NULLIF($9::INTEGER, NULL), "userId")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.picture, data.fullName, data.phoneNumber, data.gender, data.profession, data.nationality, data.birthDate, data.userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.updateByUserId = async function (userId, data) {
    const query = `
    UPDATE "profile"
    SET "picture"=COALESCE(NULLIF($2, NULL), "picture"), 
    "fullName"=COALESCE(NULLIF($3, ''), "fullName"),
    "phoneNumber"=COALESCE(NULLIF($4, ''), "phoneNumber"), 
    "gender"=COALESCE(NULLIF($5::BOOLEAN, NULL), "gender"), 
    "profession"=COALESCE(NULLIF($6, ''), "profession"), 
    "nationality"=COALESCE(NULLIF($7, ''), "nationality"), 
    "birthDate"=COALESCE(NULLIF($8::DATE, 'NOW'), "birthDate")
    WHERE "userId"=$1
    RETURNING *
  `
    const values = [userId, data.picture, data.fullName, data.phoneNumber, data.gender, data.profession, data.nationality, data.birthDate]
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
