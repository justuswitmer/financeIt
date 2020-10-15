
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(200) UNIQUE NOT NULL,
	"budgetedAmount" INT NOT NULL,
	"userId" INT
);

CREATE TABLE "transaction" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(400) NOT NULL,
	"amount" INT NOT NULL,
	"date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"account" VARCHAR(200),
	"userId" INT REFERENCES "user",
	"categoryId" INT REFERENCES "category"
);

INSERT INTO "category" ("name", "budgetedAmount", "userId")
VALUES 
('Coffee', 50, 6),
('Auto and Gas', 100, 6),
('Gear and Clothing', 200, 6),
('Mortgage', 1500, 6),
('Paycheck', 5800, 6),
('Subscriptions', 50, 6),
('Eating Out', 200, 6),
('Groceries', 300, 6),
('Home Improvements', 150, 6),
('Utilities', 80, 6),
('Travel', 50, 6),
('Charity', 60, 6),
('Stuff', 50, 6),
('Classes', 100, 6),
('Freelance', 300, 6),
('Phone', 50, 6),
('Parking', 50, 6);

SELECT SUM("budgetedAmount") FROM "category";

INSERT INTO "transaction" ("description", "amount", "date", "account", "userId", "categoryId")
VALUES
('Methow Conservancy',	-250.00,	'10/14/2020',	'Family Checking',	1,	23),
('Zeitgeist Coffee, Seattle, WA',	-10.10,	'10/14/2020',	'Alaska Airlines Visa',	1,	12),
('Shell Oil, Auto Fuel Dispenser', -38.69,	'10/13/2020',	'American Express',	1,	13),
('Winthrop Mountain Sports Winthrop, WA',	-39.32,	'10/8/2020',	'Alaska Airlines Visa',	1,	14),
('Toyota of Seattle, Seattle, WA',	-251.38,	'10/19/2020',	'Alaska Airlines Visa',	1,	13),
('Amazon.com',	-25.81,	'10/10/2020',	'Visa Rewards',	1,	14),
('Chase Bank Mortgage',	-1903.00,	'10/9/2020',	'Family Checking',	1,	15),
('Paycheck',	5544.00,	'10/9/2020',	'Family Checking',	1,	16),
('Audible',	-9.12,	'10/9/2020',	'Visa Rewards',	1,	17),
('Storyville Coffee, Seattle, WA',	-8.93,	'10/8/2020',	'Alaska Airlines Visa',	1,	18),
('Hank''s Harvest Foodstwisp WA',	-46.46,	'10/8/2020',	'American Express',	1,	19),
('Ikea Seattle, Renton, WA',	-246.54,	'10/7/2020',	'Alaska Airlines Visa',	1,	20),
('Itunes.com',	-1.59,	'10/6/2020',	'Visa Rewards',	1,	17),
('Mazama Store, Mazama',	-15.53,	'10/5/2020',	'American Express',	1,	18),
('New York Times Digital',	-18.08,	'10/5/2020',	'Visa Rewards',	1,	17),
('Roadpost Usa',	-35.85,	'10/4/2020',	'Alaska Airlines Visa',	1,	17),
('Chevron Service Stn',	-27.69,	'10/3/2020',	'American Express',	1,	13),
('Texaco Service Stn',	-25.28,	'10/10/2020',	'American Express',	1,	13),
('Costco Gas, Burlington',	-19.16,	'10/9/2020',	'American Express',	1,	13),
('Dropbox',	-6.19,	'10/9/2020',	'Alaska Airlines Visa',	1,	17),
('Zoka Coffee Roa, Seattle, WA',	-2.10,	'9/30/2020',	'Alaska Airlines Visa',	1,	18),
('Okanogan County Energy, Winthrop, WA',	-164.35,	'9/30/2020',	'Alaska Airlines Visa',	1,	21),
('Alaska Air',	-156.10,	'9/30/2020',	'Alaska Airlines Visa',	1,	22),
('Seattle YMCA',	-400.00,	'9/29/2020',	'Visa Rewards',	1,	23),
('Trader Joe''s #130, Seattle',	-69.10,	'9/28/2020',	'American Express',	1,	19),
('Roadpost Usa',	-56.98,	'9/27/2020',	'Alaska Airlines Visa',	1,	17),
('Chevron Service Stn',	-37.62,	'9/26/2020',	'American Express',	1,	13),
('Tiller (tillerhq.com)',	-10.00,	'9/26/2020',	'Alaska Airlines Visa',	1,	17),
('Shell Oil, Auto Fuel Dispenser',	-47.83,	'9/25/2020',	'American Express',	1,	13),
('Winthrop Mountain Sports Winthrop, WA',	-55.82,	'9/24/2020',	'Alaska Airlines Visa',	1,	24),
('Alaska Wilderness League',	-400.00,	'9/23/2020',	'Family Checking',	1,	23),
('Big Star Montessori',	-740.00,	'9/30/2020',	'Family Checking',	1,	25),
('Itunes.com',	-2.99,	'9/30/2020',	'Visa Rewards',	1, 17),
('Mazama Store, Mazama',	-18.18,	'9/29/2020',	'American Express',	1,	18),
('Toyota of Seattle, Seattle, WA',	-435.11,	'9/19/2020',	'Alaska Airlines Visa',	1,	13),
('Amazon.com',	-30.00,	'9/18/2020',	'Visa Rewards',	1,	14),
('PCC Natural Market - Issaquah WA',	-23.00,	'9/16/2020',	'American Express',	1, 19),
('Etsy',	923.00,	'9/15/2020',	'Family Checking',	1,	26),
('Espresso Vivace Seattle, Seattle, WA',	-7.25,	'9/14/2020',	'Alaska Airlines Visa',	1,	18),
('The Essential Baking Co, Seattle, WA',	-16.35,	'9/14/2020',	'Alaska Airlines Visa',	1,	18),
('AT&T',	-125.43,	'9/13/2020',	'Visa Rewards',	1,	27),
('Zeitgeist Coffee, Seattle, WA',	-12.51,	'9/8/2020',	'Alaska Airlines Visa',	1,	18),
('Centurylink',	-43.73,	'9/19/2020',	'Visa Rewards',	1,	27),
('Portage Bay Cafe and Cate, Seattle, WA',	-72.28,	'9/10/2020',	'Alaska Airlines Visa',	1,	18),
('Whole Foods - Seattle WA',	-108.91,	'9/10/2020',	'American Express',	1,	19),
('Chase Bank Mortgage',	-1903.00,	'9/10/2020',	'Family Checking',	1,	15),
('Paycheck',	5544.00,	'9/10/2020',	'Family Checking',	1,	16),
('Audible',	16.18,	'9/10/2020',	'Visa Rewards',	1,	17),
('REI, Store 11, Seattle',	-513.97,	'9/9/2020',	'Visa Rewards',	1,	14),
('Union Garage',	-50.00,	'9/9/2020',	'Visa Rewards',	1,	28),
('Evergreen Iga Market',	-36.76,	'9/8/2020',	'American Express',	1,	19),
('Glover Street Market',	-35.34,	'9/7/2020',	'Visa Rewards',	1,	18),
('Costco Gas, Burlington',	-19.67,	'9/6/2020',	'American Express',	1,	13),
('Texaco Service Stn',	-48.74,	'9/6/2020',	'American Express',	1,	13),
('New York Times Digital',	-20.00,	'9/6/2020',	'Visa Rewards',	1,	17),
('Dropbox',	-10.81,	'9/5/2020',	'Alaska Airlines Visa',	1,	17),
('Hank''s Harvest Foodstwisp WA',	-52.69,	'9/4/2020',	'American Express',	1,	19),
('Storyville Coffee, Seattle, WA',	-12.91,	'9/3/2020',	'Alaska Airlines Visa',	1,	18),
('Home Depot',	-251.33,	'9/10/2020',	'Alaska Airlines Visa',	1,	20),
('Zoka Coffee Roa, Seattle, WA',	-3.56,	'9/9/2020',	'Alaska Airlines Visa',	1,	18),
('Okanogan County Energy, Winthrop, WA',	-322.84,	'9/9/2020',	'Alaska Airlines Visa',	1,	21),
('Alaska Air',	-115.75,	'8/30/2020',	'Alaska Airlines Visa',	1,	22),
('Evergreen Iga Market',	-28.60,	'8/30/2020',	'American Express',	1,	19),
('Glover Street Market',	-27.97,	'8/29/2020',	'Visa Rewards',	1,	18),
('Big Star Montessori',	-621.17,	'8/28/2020',	'Family Checking',	1,	25),
('United Way',	-300.00,	'8/27/2020',	'Visa Rewards',	1,	23),
('Tiller (tillerhq.com)',	-6.87,	'8/26/2020',	'Alaska Airlines Visa',	1, 17),
('PCC Natural Market - Issaquah WA',	-14.63,	'8/25/2020',	'American Express',	1,	19),
('Etsy',	653.59,	'8/24/2020',	'Family Checking',	1,	26),
('Espresso Vivace Seattle, Seattle, WA',	-6.18,	'8/23/2020',	'Alaska Airlines Visa',	1,	18),
('The Essential Baking Co, Seattle, WA',	-15.96,	'8/23/2020',	'Alaska Airlines Visa',	1,	18),
('Shell Oil, Auto Fuel Dispenser',	-25.17,	'8/30/2020',	'American Express',	1,	13),
('Winthrop Mountain Sports Winthrop, WA',	-50.35,	'8/30/2020',	'Alaska Airlines Visa',	1,	24),
('REI, Store 11, Seattle',	-488.96,	'8/29/2020',	'Visa Rewards',	1,	14),
('Toyota of Seattle, Seattle, WA',	-260.37,	'8/20/2020',	'Alaska Airlines Visa',	1,	13),
('Amazon.com',	-16.49,	'8/19/2020',	'Visa Rewards',	1,	14),
('Hank''s Harvest Foodstwisp WA',	-27.18,	'8/17/2020',	'American Express',	1, 19),
('Khan Academy',	-300.00,	'8/16/2020',	'Family Checking',	1,	23),
('Roadpost Usa',	-34.22,	'8/15/2020',	'Alaska Airlines Visa',	1,	17),
('Chevron Service Stn',	-25.75,	'8/14/2020',	'American Express',	1,	13),
('Texaco Service Stn',	-44.81,	'8/13/2020',	'American Express',	1,	13),
('AT&T',	-102.85,	'8/13/2020',	'Visa Rewards',	1,	27),
('Costco Gas, Burlington',	-13.77,	'8/8/2020',	'American Express',	1,	13),
('Zeitgeist Coffee, Seattle, WA',	-10.26,	'8/19/2020',	'Alaska Airlines Visa',	1,	18),
('Dropbox',	-9.71,	'8/19/2020',	'Alaska Airlines Visa',	1,	17),
('Storyville Coffee, Seattle, WA',	-11.73,	'8/10/2020',	'Alaska Airlines Visa',	1,	18),
('Chase Bank Mortgage',	-1903.00,	'8/10/2020',	'Family Checking',	1,	15),
('Paycheck',	5544.00,	'8/10/2020',	'Family Checking',	1,	16),
('Audible',	-15.12,	'8/10/2020',	'Visa Rewards',	1,	17),
('North Valley Lumber',	-249.68,	'8/9/2020',	'Alaska Airlines Visa',	1,	20),
('Itunes.com',	-2.08,	'8/8/2020',	'Visa Rewards',	1,	17),
('Mazama Store, Mazama',	-16.07,	'8/7/2020',	'American Express',	1,	18),
('Trader Joe''s #130, Seattle',	-68.52,	'8/6/2020',	'American Express',	1,	19),
('New York Times Digital',	-18.12,	'8/6/2020',	'Visa Rewards',	1,	17),
('Centurylink',	-24.42,	'8/5/2020',	'Visa Rewards',	1,	27),
('Whole Foods - Seattle WA',	-107.76,	'8/4/2020',	'American Express',	1,	19),
('Portage Bay Cafe and Cate, Seattle, WA',	-60.21,	'8/3/2020',	'Alaska Airlines Visa',	1,	18),
('Union Garage',	-25.41,	'8/3/2020',	'Alaska Airlines Visa',	1,	28),
('Zoka Coffee Roa, Seattle, WA',	-2.52,	'8/10/2020',	'Alaska Airlines Visa',	1,	18),
('Okanogan County Energy, Winthrop, WA',	-205.44,	'8/10/2020',	'Alaska Airlines Visa',	1,	21);




-------------------------------Queries Below-------------------------------

SELECT * FROM "user"
JOIN "transactions"
ON "transactions"."userId" = "user"."id"
JOIN "category"
ON "category"."id" = "transactions"."categoryId"
;

SELECT "user"."username", "transactions"."description", "transactions"."amount", "category"."name" FROM "user"
JOIN "transactions"
ON "transactions"."userId" = "user"."id"
JOIN "category"
ON "category"."id" = "transactions"."categoryId"
;

SELECT * FROM "user"
JOIN "category"
ON "category"."userId" = "user"."id"
;


-- Query for pulling in amount spent in each category between dates specified ordered alphabetically 
SELECT "category"."name" as "category", "category"."budgetedAmount", SUM("transaction"."amount") as "categoryAmount" FROM "user"
JOIN "transaction"
ON "transaction"."userId" = "user"."id"
JOIN "category"
ON "category"."id" = "transaction"."categoryId"
WHERE "transaction"."date" BETWEEN '2020/10/01' AND '2020/10/31'
GROUP BY "category"."name", "category"."budgetedAmount"
ORDER BY "category"."name" ASC
;

-- Query for getting categories ordered alphabetically
SELECT * FROM "category"
ORDER BY "category"."name" ASC
;

--Query for pulling in amount spent for a category between dates specified 
SELECT "category"."name" as "category", SUM("transaction"."amount") as "categoryAmount" FROM "user"
JOIN "transaction"
ON "transaction"."userId" = "user"."id"
JOIN "category"
ON "category"."id" = "transaction"."categoryId"
WHERE "transaction"."date" BETWEEN '2020/10/01' AND '2020/10/31'
AND "category"."id" = 13
GROUP BY "category"."name"
;

--Query for pulling in amount spent for a categoryId between dates specified
SELECT SUM("transaction"."amount") FROM "transaction"
	WHERE "transaction"."date" BETWEEN '2020/10/01' AND '2020/10/31'
	AND "transaction"."categoryId" = 21
	GROUP BY "transaction"."categoryId"
	;

-- Query for pulling in a budgetedAmount for a category id
SELECT "category"."budgetedAmount" FROM "category"
	WHERE "category"."id" = 21
	GROUP BY "category"."budgetedAmount"
	;

-- Query for subtracting amount spent from budgetedAmount
SELECT
	(SELECT SUM("transaction"."amount") FROM "transaction"
	WHERE "transaction"."date" BETWEEN '2020/10/01' AND '2020/10/31'
	AND "transaction"."categoryId" = 21
	GROUP BY "transaction"."categoryId") 
	+
	(SELECT "category"."budgetedAmount" FROM "category"
	WHERE "category"."id" = 21
	GROUP BY "category"."budgetedAmount")
;


