const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attack: {
      type: Number,
      required: true,
    },
    life: {
      type: Number,
      required: true,
    },
    defense: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'cards',
  }
);

module.exports = CardSchema;
