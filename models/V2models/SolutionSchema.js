const mongoose = require("./../connection");

const solutionSchema = new mongoose.Schema({
  //Author for the Sting / who needs help
  author: { type: String },
  //Date the ticket was created
  date: { type: String },
  //Block of code for updated solution to try
  solutionCodeBlock: { type: String },
  //Desciption of solution idea
  solutionDescription: { type: String },
});

module.exports = solutionSchema;
