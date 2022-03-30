const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/buzz-kill-mern-api")

module.exports = mongoose