require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use("/users", require("./routes/userRoutes"));

app.get("/", function (req, res) {
  res.send("hello, earth!");
});

const Sting = require("./controllers/V1controllers/V1StingController");
app.use("/stings", Sting);

const Project = require("./controllers/V1controllers/V2ProjectController");
app.use("/projects", Project);

app.listen(PORT, () => {
  console.log(`Listening in on port: ${PORT}`);
});
