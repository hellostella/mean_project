var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String
});


UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf25Sync(password, this.salt, 1000, 64).toString('hex');

  return this.has === hash;
}
mongoose.model('User', UserSchema);
