var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    // You should be able to get the days of the trip by selecting a date-span connected to the user.
    var daySchema = new Schema({
      tripId:String, 
      date:{type: Date, required: true},
      starting_point: {type: String, required: true},
      destinations: {
        address: [ String ],
        distances:[ Number ],
        discription:[ String ]
      },
      created_at: Date,
      updated_at: Date
    });

    daySchema.pre('save', function(next) {
      var currentDate = new Date();

      this.updated_at = currentDate;

      if (!this.created_at)
        this.created_at = currentDate;

      next();
    });


module.exports = mongoose.model('Day', daySchema);
