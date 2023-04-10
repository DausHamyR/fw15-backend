const db = require("../helpers/db.helper")

exports.findAll = async function () {
    const {rows} = await db.query(`
    SELECT * FROM "users"
    `)
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

exports.insert = async function (data) {
    const query = `
    INSERT INTO "users" ("email", "password")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.email, data.password]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "users"
    SET "email"=$2, "password"=$3 
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.email, data.password]
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
