const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
	password: mongoose.Schema.Types.String
});
  
const User = mongoose.model('User', UserSchema);

module.exports = User;
