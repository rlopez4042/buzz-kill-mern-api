const express = require("express");
const router = express.Router();
const Project = require("./../models/projectSchema");
// const Solution = require("./../models/SolutionSchema")
const authenticate = require("../middleware/authenticate");

//Create Sting
router.post("/", authenticate, (req, res) => {
  const data = req.body;
  Project.create(data).then((project) =>
    res.json({
      status: 200,
      project: project,
    })
  );
});

module.exports = router;