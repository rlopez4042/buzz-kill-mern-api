const mongoose = require("./../connection");
const test = require("./Test");
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  author: { type: String, required: true },
  // date: { type: String, required: true },
  // solution: { type: String, required: true },
  // helpful: { type: Boolean, default: false },
  // visible: { type: Boolean, default: true },
  test:[test]
});

module.exports = solutionSchema;
