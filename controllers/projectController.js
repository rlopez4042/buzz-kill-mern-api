const express = require("express");
const router = express.Router();
const Project = require("./../models/ProjectSchema");
const authenticate = require("../middleware/authenticate");

//Create project
router.post("/", (req, res) => {
  const data = req.body;
  Project.create(data).then((project) =>
    res.json({
      status: 200,
      project: project,
    })
  );
});

//Read all projects
router.get("/", (req, res) => {
  Project.find().then((projects) =>
    res.json({
      status: 200,
      projects: projects,
    })
  );
});

//Read one project by ID
router.get("/:id", (req, res) => {
  Project.findById(req.params.id).then((project) => {
    res.json({
      status: 200,
      project: project,
    });
  });
});

//Update one project by ID
router.patch("/:id", (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body).then((project) => {
    res.json({
      status: 200,
      msg: "Item updated.",
      sting: project,
    });
  });
});

//Delete one project by ID
router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id).then((project) => {
    res.json({
      status: 200,
      project: project,
    });
  });
});

//Add sting to project
router.put("/addSting/:id", (req, res) => {
  Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { stings: req.body } },
    { new: true }
  )
    .then((project) => res.json({ status: 200, project: project }))
    .catch((error) => console.log(error));
});


//Add solution to Sting
router.put("/addSolution/:id/", (req, res) => {
  Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { "stings.$[].solutions": req.body } },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

//Delete a sting
router.put("/deleteSting/:id/:stingsID", async (req, res) => {
  Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { stings: { _id: req.params.stingsID } } },
    { new: true }
  )
    .then((projects) => res.json({ status: 200, projects: projects }))
    .catch((error) => console.log(error));
});

//Delete a solution
router.put("/deleteSolution/:id/:solutionID", (req, res) => {
  Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { "stings.$[].solutions": { _id: req.params.solutionID } } },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

module.exports = router;
