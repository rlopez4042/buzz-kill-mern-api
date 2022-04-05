const express = require("express");
const router = express.Router();
const Project = require("../../models/V1models/ProjectSchema.js");
const { authenticate } = require("../../middleware/authenticate");

// Create a project
router.post("/", authenticate, (req, res) => {
  const data = req.body;
  Project.create(data).then((project) =>
    res.json({
      status: 200,
      stings: project,
    })
  );
});

//Read all projects
router.get("/", (req, res) => {
  Project.find().then((projects) =>
    res.json({
      status: 200,
      stings: projects,
    })
  );
});

//*--* Update functionality for after V3. *--*//

//Delete one project by ID
router.delete("/:id", authenticate, (req, res) => {
  Project.findByIdAndDelete(req.params.id).then((project) => {
    res.json({
      status: 200,
      msg: "Item deleted.",
      project: project,
    });
  });
});

module.exports = router;
