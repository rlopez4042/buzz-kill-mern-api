const mongoose = require("./../connection");
const solutionSchema = require("./SolutionSchema");

const stingSchema = new mongoose.Schema({
  author: { type: String, required: true },
  date: { type: String, required: true },
  codeBlock: { type: String, required: true },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  solutions: [solutionSchema],
});
module.exports = mongoose.model("Sting", stingSchema);
