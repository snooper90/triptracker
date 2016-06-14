var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


// add currentDate and updated_at
userSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('User', userSchema);
