const mongoose = require('mongoose');
const UserSchema = require('./model/user');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/cardz-api');

const cardSchema = new Schema(
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

module.exports = {
  Mongoose: mongoose,
  CardSchema: cardSchema,
  UserSchema,
};
