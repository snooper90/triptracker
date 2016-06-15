var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Day = require('./day');

    var tripSchema = new Schema({
      userId:String,
      name:{type: String, required: true},
      start_date: { type: Date, required: true},
      end_date:{ type: Date, required: true},
      created_at: Date,
      updated_at: Date,

      //days: [String]
    });
    // create created date and update apdated date
    tripSchema.post('save', function(){
      // if (!this.days[0]){
        var trip = this;
        var span = dateDiffInDays(this.start_date, this.end_date) + 1;
        var start = this.start_date;
        var counterDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        for (var i = 0; i < span; i++){
          // set day of the day object
          var day = new Day({ tripId: this._id, date: counterDate})
          // save the day
          day.save(function(err, day){
            console.log(err);
            //add the day _id to the trip object
            // trip.days.push(day._id);
            // console.log(trip.days);
          });
          //incriment the day
          counterDate.setDate(counterDate.getDate() + 1);
        }
      // }
    });

    //
    tripSchema.pre('save', function(next) {

      var currentDate = new Date();
      //update the updated_at
      this.updated_at = currentDate;
      //add created date
      if (!this.created_at)
        this.created_at = currentDate;

      next();
    });


    function dateDiffInDays(a, b) {
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
module.exports = mongoose.model('Trip', tripSchema);
