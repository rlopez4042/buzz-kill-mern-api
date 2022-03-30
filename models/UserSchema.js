const mongoose = require("./../connection");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please complete all fields."] },
    email: { type: String, required: [true, "Please complete all fields."] },
    password: { type: String, required: [true, "Please complete all fields."] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
