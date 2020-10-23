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
  "transaction"."amount", "transaction"."date", 
  "transaction"."categoryId", "category"."name" FROM "transaction"
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
  console.log('getting my req.body in transaction router POST', req.body);
  const description = req.body.transaction.description;
  const amount = req.body.transaction.amount;
  const date = req.body.transaction.date;
  const userId = req.body.user;
  const categoryId = req.body.transaction.categoryId;
  queryText = `INSERT INTO "transaction"("description", "amount", 
  "date", "userId", "categoryId")
  VALUES
  ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [description, amount, date, userId, categoryId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in transactions router POST', err);
      res.sendStatus(500);
    });
});

// route to update a new transaction to the transaction table
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body in PUT', req.body);
  const description = req.body.transaction.description;
  const amount = req.body.transaction.amount;
  const date = req.body.transaction.date;
  const categoryId = req.body.transaction.categoryId;
  const transactionId = req.body.transactionId;
  queryText = `UPDATE "transaction"
  SET "description" = $1,
    "amount" = $2,
    "date" = $3,
    "categoryId" = $4
  WHERE "transaction"."id" = $5;`;
  pool
    .query(queryText, [description, amount, date, categoryId, transactionId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('we got an error in transaction router PUT', err);
      res.sendStatus(500);
    });
});

// route to delete a transaction
router.delete('/:id', (req, res) => {
  console.log(req.params);
  queryText = `DELETE FROM "transaction" WHERE "id" = $1`;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    }).catch(err => {
      console.log('got an error in transaction router DELETE', err);
      res.sendStatus(500);
    })
});

module.exports = router;