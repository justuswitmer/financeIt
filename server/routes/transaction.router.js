const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


// route to retrieve transactions grouped by dates
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body in transaction router', req.body);

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  queryText = `SELECT "transaction"."id", "transaction"."description", 
  "transaction"."amount", "transaction"."date", "transaction"."account", 
  "category"."name" FROM "transaction"
  JOIN "category"
  ON "transaction"."categoryId" = "category"."id"
  WHERE "transaction"."date" BETWEEN $1 AND $2
  ORDER BY "transaction"."date" ASC
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

// route to retrieve transactions grouped by dates
router.post('/add', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body in transaction router', req.body);
  const description = req.body.description;
  const amount = req.body.amount;
  const date = req.body.date;
  const account = req.body.account;
  const userId = req.body.userId;
  const categoryId = req.body.categoryId;
  queryText = `INSERT INTO "transaction"("description", "amount", 
  "date", "account", "userId", "categoryId")
  VALUES
  ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [description, amount, date, account, userId, categoryId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in transactions router', err);
      res.sendStatus(500);
    });
});

module.exports = router;