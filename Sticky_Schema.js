var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var StickySchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  content: { type: String }
});

module.exports = mongoose.model("Sticky", StickySchema);
