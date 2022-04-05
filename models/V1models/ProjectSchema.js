const mongoose = require("../../connection");

const projectSchema = new mongoose.Schema({
  //Person who creates the project
  director: { type: String },
  //Date the project was created
  date: { type: String },
  //Quick description of the project
  projectTitle: { type: String },
  //Quick description of the project
  projectDescription: { type: String },
  //Links for project repository(s)
  repoLink: { type: String },
});
module.exports = mongoose.model("Project", projectSchema);
