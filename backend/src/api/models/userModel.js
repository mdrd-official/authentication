const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type:String,
    // required: true
  },
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  email:{
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  image:{
    type: String,
    // required: true,
  },
  mobile:{
    type: String,
    // required: true,
  },
  role:{
    type: String,
    // required: true,
  },

}, { timestamps: true});
const User = mongoose.model('User', userSchema);

module.exports = User;
