const mongoose = require("./../connection");
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  name: String,
  date: String,
  solution: String,
});

module.exports = solutionSchema;
