
const mongoose = require("mongoose");
let mongourl = "";

if (process.env.NODE_ENV === "production") {
  mongourl = process.env.DB_URL;
} else {
  mongourl = "mongodb://127.0.0.1/buzz-kill-mern-api";
}

mongoose.connect(mongourl);
// mongoose.connect("mongodb://localhost/vinyl-api")

module.exports = mongoose;

// const mongoose = require('mongoose')

// mongoose.connect("mongodb://127.0.0.1/buzz-kill-mern-api")

// module.exports = mongoose