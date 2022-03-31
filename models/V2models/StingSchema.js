const mongoose = require("../../connection");
const solutionSchema = require("./SolutionSchema");

const stingSchema = new mongoose.Schema({
  //Author for the Sting / who needs help
  author: { type: String },
  //Date the ticket was created
  date: { type: String },
  //Block of code for where the issue is
  codeBlock: { type: String },
  //Desciption for intent and issue description
  description: { type: String },
  //isComplete: { type: Boolean, default: false },
  solutions: [solutionSchema],
});
module.exports = stingSchema;
