var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var tripSchema = new Schema({
      userId:String,
      name:{type: String, required: true},
      start_date: { type: Date, required: true},
      end_date:{ type: Date, required: true},
      created_at: Date,
      updated_at: Date,
      //  I should list the dates between start and end
      days: [String]
    });
    // create created date and update apdated date
    tripSchema.pre('save', function(next){
      if (!this.days[0]){
        var span = dateDiffInDays(this.start_date, this.end_date) + 1;
        var start = this.start_date;
        var startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        console.log("start date: " + start );
        for (var i = 0; i <= span; i++){
          console.log(startDate);
          startDate.setDate(startDate.getDate() + 1);
        }

      }

      next()
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
