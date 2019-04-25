var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var courseNameSchema = new Schema({
  courseId: { type: String }
});

var FacultySchema = new Schema({
  facultyId: { type: String, required: true, unique: true },
  facultyName: { type: String, required: true },
  courses: [courseNameSchema]
});

module.exports = mongoose.model("Faculty", FacultySchema);
