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
  console.log('in category GET router');
  queryText = `SELECT * FROM "category"
  ORDER BY "category"."id" ASC
  ;`;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in categories router GET', err);
      res.sendStatus(500);
    });
});

// route to add a new category to the category table
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body', req.body);
  const category = req.body.category;
  const budgetedAmount = req.body.budgetedAmount;
  const user = req.body.user;
  queryText = `INSERT INTO "category"("name", "budgetedAmount", "userId")
  VALUES
    ($1, $2, $3);`;
  pool
    .query(queryText, [category, budgetedAmount, user])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in category router POST', err);
      res.sendStatus(500);
    });
});

// route to update a new category to the category table
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('getting my req.body in PUT', req.body);
  const category = req.body.category;
  const budgetedAmount = req.body.budgetedAmount;
  const categoryId = req.body.categoryId;
  queryText = `UPDATE "category"
  SET "name" = $2,
    "budgetedAmount" = $3
  WHERE "category"."id" = $1;`;
  pool
    .query(queryText, [categoryId, category, budgetedAmount])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('we got an error in category router PUT', err);
      res.sendStatus(500);
    });
});

// route to delete a category
router.delete('/:id', (req, res) => {
  console.log(req.params);
  queryText = `DELETE FROM "category" WHERE "id" = $1`;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    }).catch(err => {
      console.log('got an error in category router DELETE', err);
      res.sendStatus(500);
    })
});

module.exports = router;