const express = require("express");
const router = express.Router();
const Project = require("./../models/projectSchema");
// const Solution = require("./../models/SolutionSchema")
const authenticate = require("../middleware/authenticate");

//Create Sting
router.post("/", (req, res) => {
  const data = req.body;
  Project.create(data).then((project) =>
    res.json({
      status: 200,
      project: project,
    })
  );
});

router.get("/", (req, res) => {
  Project.find().then((projects) =>
    res.json({
      status: 200,
      projects: projects,
    })
  );
});

module.exports = router;