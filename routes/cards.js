const express = require('express');
const database = require('../db');

const router = express.Router();

/* GET all customers. */
router.get('/', (req, res, next) => {
  const cards = database('card')
    .select()
    .then(rows => {
      res.json(rows);
      res.end();
    });
});


router.post('/', (req, res, next) => {
  const cards = req.body;

  cards.forEach((v, k) => {
    database('cards')
      .insert(v)
      .into('card');
  });

  res.end();
});

module.exports = router;
