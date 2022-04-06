const mongoose = require("../../connection");

const V1SolutionSchema = new mongoose.Schema({
  //ProjectID for grouping
  projectID: { type: String },
  //Author for the Sting / who needs help
  author: { type: String },
  //Date the ticket was created
  time: { type: String },
  //Block of code for updated solution to try
  codeBlock: { type: String },
  //Desciption of solution idea
  description: { type: String },
  //If true, proposed solution is Correcnt
  solution: { type: Boolean, default: false },
});

module.exports = V1SolutionSchema;
