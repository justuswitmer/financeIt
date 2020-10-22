const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// route getting all categories
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('in summary GET router');
  queryText = `SELECT SUM("budgetedAmount") FROM "category"
  ;`;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in summary router GET', err);
      res.sendStatus(500);
    });
});


// route to retrieve transactions grouped by categories and dates
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body in summary router POST', req.body);
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  queryText = `SELECT "category"."name" as "category", "category"."budgetedAmount", SUM("transaction"."amount") as "categoryAmount" FROM "user"
  JOIN "transaction"
  ON "transaction"."userId" = "user"."id"
  JOIN "category"
  ON "category"."id" = "transaction"."categoryId"
  WHERE "transaction"."date" BETWEEN $1 AND $2
  GROUP BY "category"."name", "category"."budgetedAmount"
  ORDER BY "category"."name" ASC
  ;`;
  pool
    .query(queryText, [startDate, endDate])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in transactions router', err);
      res.sendStatus(500);
    });
});

// route getting transactions according to date
router.post('/sum', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body in summary router POST', req.body);
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  console.log('in summary router POST sum');
  queryText = `SELECT SUM("amount") FROM "transaction"
  WHERE "date" BETWEEN $1 AND $2
  ;`;
  pool
    .query(queryText, [startDate, endDate])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in summary router POST sum', err);
      res.sendStatus(500);
    });
});

module.exports = router;