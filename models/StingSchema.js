const mongoose = require("./../connection");
const Schema = mongoose.Schema;
const solutionSchema = require("./SolutionSchema");

const stingSchema = new Schema({
  author: String,
  date: String,
  codeBlock: String,
  description: String,
  solutions: [solutionSchema],
});

module.exports = mongoose.model("Sting", stingSchema);
