var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var adminDashboardSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: String,
//   designation: String
    datelogin : [   {   date : String ,
                        studentCount : Number ,
                        facultyCount : Number  
                 } ]
    
});

module.exports = mongoose.model("Admindashboard", adminDashboardSchema);
