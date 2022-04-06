
const mongoose = require("mongoose");
let mongourl = "";

if (process.env.NODE_ENV === "production") {
  mongourl = process.env.DB_URL;
} else {
  mongourl = "mongodb://127.0.0.1/buzz-kill-mern-api";
}

mongoose.connect(mongourl);

module.exports = mongoose;