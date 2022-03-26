const mongoose = require("./../connection");
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  author: { type: String, required: true },
  date: { type: String, required: true },
  solution: { type: String, required: true },
  helpful: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
});

module.exports = solutionSchema;
