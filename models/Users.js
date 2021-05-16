const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  createdOn: Date,
});

mongoose.model("users", userSchema);
