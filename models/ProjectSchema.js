const mongoose = require("./../connection");

const projectSchema = new mongoose.Schema({
  project: { type: String, required: true },
  stings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sting'}],
//   solutions: [{type: mongoose.Types.ObjectId(stingId}],

});
module.exports = mongoose.model("Project", projectSchema);