var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var EventSchema = new Schema({
  topic: { type: String },
  notification: { type: String },
  date: { type: String },
  time: { type: String }
});

module.exports = mongoose.model("Event", EventSchema);
