const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET all customers. */
router.get('/cards/:id', (req, res, next) => {
    const Card = db.Mongoose.model('cards', db.CardSchema, 'cards');
  
    Card.find({ _id: req.params.id })
      .lean()
      .exec((e, docs) => {
        res.json(docs);
        res.end();
      });
  });

module.exports = router;
