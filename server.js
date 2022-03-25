require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT

// const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.get('/', function (req, res) {
    res.send('hello, earth!')
})

const stingController = require("./controllers/stingController");
app.use("/stings", stingController);

// const solutionsController = require("./controllers/solutionsController");
// app.use("/stings/solutions", solutionsController);

app.listen(PORT, () => {
    console.log(`Listening in on port: ${PORT}`)
})