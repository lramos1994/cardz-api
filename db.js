const mongoose = require('mongoose');
const UserSchema = require('./model/user');
const CardSchema = require('./model/card');

mongoose.connect('mongodb://localhost:27017/cardz-api');

module.exports = {
  Mongoose: mongoose,
  CardSchema,
  UserSchema,
};
