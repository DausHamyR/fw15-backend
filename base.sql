-- Active: 1680688894764@@127.0.0.1@5432@postgres@public
CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updateAt" TIMESTAMP DEFAULT NULL
);

INSERT INTO "users" ("email", "password") VALUES ('daus@mail.com', '1234');

SELECT * FROM "users";
SELECT * FROM "users" WHERE "id"=1;

UPDATE "users" SET "email"='admin@gmail.com' WHERE "id"=1;

DELETE FROM "users" WHERE "id"=4;

SELECT * FROM "users" WHERE "password" LIKE '1234';
SELECT * FROM "users" ORDER BY "password" DESC;
SELECT * FROM "users" LIMIT 3 OFFSET 2;
SELECT * FROM "users" LIMIT 3;
