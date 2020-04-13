const express = require('express');
const mongoose = require('mongoose');
const database = require('../database');
const db = require('../db');

const router = express.Router();

/* GET all cards. */
router.get('/', (req, res, next) => {
  const Card = mongoose.model('cards', db.CardSchema, 'cards');

  Card.find({ _id: req.params.id })
    .lean()
    .exec((e, docs) => {
      res.json(docs);
      res.end();
    });
});

/* Create card. */
router.get('/', (req, res, next) => {
  const Card = mongoose.model('cards', db.CardSchema, 'cards');

  Card.find({ _id: req.params.id })
    .lean()
    .exec((e, docs) => {
      res.json(docs);
      res.end();
    });
});

module.exports = router;
