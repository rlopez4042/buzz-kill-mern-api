const mongoose = require("../../connection");
const v1SolutionSchema = require("./V1SolutionSchema");

const v1StingSchema = new mongoose.Schema({
  //Author for the Sting / who needs help
  author: { type: String },
  //Date the ticket was created
  time: { type: String },
  //Block of code for where the issue is
  codeBlock: { type: String },
  //Desciption for intent and issue description
  description: { type: String },
  //isComplete: { type: Boolean, default: false },
  solutions: [v1SolutionSchema],
});
module.exports = mongoose.model("Sting", v1StingSchema);