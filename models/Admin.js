const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  password: String,
  email: String,
});

mongoose.model("admin", adminSchema);
