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
  queryText = `SELECT * FROM "transaction"
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

module.exports = router;