var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var Marks = new Schema({
  testName: { type: String, unique: true, required: true },
  marks: { type: Number, required: true }
});

var StudentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  studentMarks: [Marks]
});

var CourseMarkSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  student: [StudentSchema]
});

module.exports = mongoose.model("CourseMarks", CourseMarkSchema);
