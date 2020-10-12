
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(200) UNIQUE NOT NULL,
	"budgetedAmount" INT NOT NULL
);

CREATE TABLE "manualImport" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(400) UNIQUE NOT NULL,
	"amount" INT NOT NULL,
	"date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"userId" INT REFERENCES "user",
	"categoryId" INT REFERENCES "category"
);

INSERT INTO "category" ("name", "budgetedAmount")
VALUES ('Groceries', 300),
('Utilities', 1300);

INSERT INTO "manualImport" ("description", "amount", "date", "userId", "categoryId")
VALUES ('Target', 34.68, '10-12-2020', 6, 1);

SELECT * FROM "user"
JOIN "manualImport"
ON "manualImport"."userId" = "user"."id"
JOIN "category"
ON "category"."id" = "manualImport"."categoryId"
;

SELECT "user"."username", "manualImport"."description", "manualImport"."amount", "category"."name" FROM "user"
JOIN "manualImport"
ON "manualImport"."userId" = "user"."id"
JOIN "category"
ON "category"."id" = "manualImport"."categoryId"
;