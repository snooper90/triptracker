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
        var counterDate = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());

        for (var i = 0; i < span; i++){
          createDay(trip, counterDate)
          console.log('counter date ' +counterDate);
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
    function createDay(trip, date){
      var saveDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      var day = new Day({ tripId: trip._id, date: saveDate})
      day.save(function(err, day){
        console.log(err);
        console.log('saved date ' + date);
      });
    }

    function dateDiffInDays(a, b) {
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
module.exports = mongoose.model('Trip', tripSchema);
