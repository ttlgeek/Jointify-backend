const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the Schema.

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Creating the Model.

const User = mongoose.model('user', userSchema);

// Exporting the Model.

module.exports = User;
