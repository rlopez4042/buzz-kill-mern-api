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

//Delete one sting by ID
router.delete("/:id", authenticate, (req, res) => {
  Project.findById(req.params.id).then((project) => {
    const data = project.directorID;
    const userID = req.user.id;
    if (data == userID) {
      Project.findByIdAndDelete(req.params.id).then((project) => {
        res.json({
          status: 200,
          msg: "Item deleted.",
          project: project,
          id: data,
        });
      });
    } else {
      console.log("Cannot delete.");
    }
  });
});

module.exports = router;
