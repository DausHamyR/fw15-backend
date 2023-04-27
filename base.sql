CREATE TABLE "users" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(255),
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "profile" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INTEGER,
    "picture" VARCHAR(255),
    "fullName" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "gender" BOOLEAN,
    "profession" VARCHAR(255),
    "nationality" VARCHAR(255),
    "birthDate" DATE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "categories" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "cities" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "events" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "title" VARCHAR(255),
    "date" DATE,
    "cityId" INTEGER,
    "createdBy" INTEGER,
    "descriptions" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "eventCategories" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "eventId" INTEGER,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "partners" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationSections" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "price" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationStatus" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "paymentMethod" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservations" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "eventId" INTEGER,
    "userId" INTEGER,
    "statusId" INTEGER,
    "paymentMethodId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationTickets" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "reservationId" INTEGER,
    "sectionId" INTEGER,
    "quantity" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "wishlists" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "eventId" INTEGER,
    "userId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "forgotRequest" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255),
    "code" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
INSERT INTO "categories" ("name") VALUES ('Music'), ('Festival'), ('Show'), ('Competitions');
INSERT INTO "cities" ("name") VALUES ('Bandung'), ('Jakarta'), ('Medan'), ('Lampung'), ('Bali');
INSERT INTO "events" ("title", "descriptions", "date", "cityId") VALUES
('Konser Dewa 19', 'Lorem ipsum dolor sit amet constectur adispicing elit', '2022-04-19', 1),
('Jakarta Fair', 'Lorem ipsum dolor sit amet constectur adispicing elit', '2022-04-29', 2),
('Festival Danau Toba', 'Lorem ipsum dolor sit amet constectur adispicing elit', '2022-05-01', 3),
('Lampung Krakatau Festival', 'Lorem ipsum dolor sit amet constectur adispicing elit', '2022-05-05', 4),
('Dream Machine Bali', 'Lorem ipsum dolor sit amet constectur adispicing elit', '2022-06-08', 5);
INSERT INTO "eventCategories" ("eventId", "categoryId") VALUES
(1,1), (2,2), (3,2), (4,2), (5,1), (1, 2);
