const { Schema } = require('mongoose');
const { database } = require('./database');
const UserSchema = require('./model/user');

database.start();

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
  CardSchema: cardSchema,
  UserSchema,
};
