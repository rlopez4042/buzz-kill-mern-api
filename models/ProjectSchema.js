const { Schema } = require("./../connection");
const mongoose = require("./../connection");
const stingSchema = require("./StingSchema");

const projectSchema = new mongoose.Schema({
  project: { type: String, required: true },
  solutions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sting'}],
//   solutions: [{type: mongoose.Types.ObjectId(stingId}],

});
module.exports = mongoose.model("Project", projectSchema);