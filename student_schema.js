var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var courseSchema = new Schema({
  courseName: { type: String, required: true },
  courseLink: { type: String, required: true }
});

var studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  course: [courseSchema]
});

module.exports = mongoose.model("Student", studentSchema);
