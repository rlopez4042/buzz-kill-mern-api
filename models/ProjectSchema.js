const mongoose = require("./../connection");
const stingSchema = require("./StingSchema");

const projectSchema = new mongoose.Schema({
  //Person who creates the project 
  director: { type: String },
  //Date the project was created
  date: { type: String },
  //Quick description of the project
  projectDescription: { type: String },
  //Links for project repository(s)
  repoLink: { type: String },
  //Members in the project
  // members: [{teamMember: { type: String }}],
  //Trouble tickets within the project
  stings: [stingSchema],
});
module.exports = mongoose.model("Project", projectSchema);