const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET all cards. */
router.get('/', (req, res, next) => {
  const Card = db.Mongoose.model('cards', db.CardSchema, 'cards');

  Card.find({})
    .lean()
    .exec((e, docs) => {
      res.json(docs);
      res.end();
    });
});

/* Create card. */
router.post('/', (req, res, next) => {
  const Card = db.Mongoose.model('cards', db.CardSchema, 'cards');

  const newcart = new Card({
    name: req.body.name,
    attack: req.body.attack,
    life: req.body.life,
    defense: req.body.defense,
  });

  newcart.save(err => {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    res.json(newcart);
    res.end();
  });
});

/* Create card. */
router.put('/:id', (req, res, next) => {
  const Card = db.Mongoose.model('cards', db.CardSchema, 'cards');

  Card.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { upsert: true },
    (err, doc) => {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      res.json(req.body);
      res.end();
    }
  );
});

router.delete('/:id', (req, res, next) => {
  const Card = db.Mongoose.model('cards', db.CardSchema, 'cards');

  Card.find({ _id: req.params.id }).remove(err => {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    res.json({ success: true });
    res.end();
  });
});

module.exports = router;
