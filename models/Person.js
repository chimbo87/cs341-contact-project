const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  favoriteColor: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Person', personSchema);