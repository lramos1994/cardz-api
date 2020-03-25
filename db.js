const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cardz-api');

const cardSchema = new mongoose.Schema(
  {
    name: String,
    attack: Number,
    life: Number,
    defense: Number,
  },
  {
    collection: 'cards',
  }
);

module.exports = { Mongoose: mongoose, CardSchema: cardSchema };
