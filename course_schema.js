var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var notificationSchema = new Schema({
  topic: { type: String },
  notification: { type: String },
  date: { type: String },
  time: { type: String }
});

var fileSchema = new Schema({
  fileName: { type: String, required: true },
  fileLink: { type: String, required: true }
});

var courseSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  notification: [notificationSchema],
  file: [fileSchema]
});

module.exports = mongoose.model("Course", courseSchema);
