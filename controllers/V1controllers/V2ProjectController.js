const express = require("express");
const router = express.Router();
const Project = require("../../models/V1models/ProjectSchema.js");
const { authenticate } = require("../../middleware/authenticate");

router.post("/", authenticate, (req, res) => {
  const data = req.body;
  Project.create(data).then((project) =>
    res.json({
      status: 200,
      stings: project,
    })
  );
});

//   Read all stings
router.get("/", (req, res) => {
  Project.find().then((projects) =>
    res.json({
      status: 200,
      stings: projects,
    })
  );
});

//Delete one sting by ID
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
