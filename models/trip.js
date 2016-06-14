var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var tripSchema = new Schema({
      userId:String,
      name:{type: String, required: true},
      start_date: { type: Date, required: true},
      end_date:{ type: Date, required: true},
      created_at: Date,
      updated_at: Date
      // should I list the dates between start and end?
    });
    // create created date and update apdated date
    tripSchema.pre('save', function(next) {

      var currentDate = new Date();
      //update the updated_at
      this.updated_at = currentDate;
      //add created date
      if (!this.created_at)
        this.created_at = currentDate;

      next();
    });


module.exports = mongoose.model('Trip', tripSchema);
