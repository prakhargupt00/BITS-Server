// /backend/data.js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);
const Schema = mongoose.Schema;

// this will be our data base's data structure
const StudentProfileSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    message: String,
    name: String,
    age: Number,
    contact: Number,
    emailId: String,
    password: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
