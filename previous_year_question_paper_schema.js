var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var fileSchema = new Schema({
  fileName: { type: String, required: true },
  fileLink: { type: String, required: true }
});

var yearnsemMaterialSchema = new Schema({
  year: { type: String, required: true },
  semester: { type: String, required: true },
  file: [fileSchema]
});

var previousYearQuestionPaperSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String },
  yearnsemMaterial: [yearnsemMaterialSchema]
});

module.exports = mongoose.model(
  "PreviousYearQuestionPaperSchema",
  previousYearQuestionPaperSchema
);
