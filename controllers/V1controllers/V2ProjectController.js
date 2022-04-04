const express = require("express");
const router = express.Router();
const Project = require("../../models/V1models/ProjectSchema");
// models/V1models/ProjectSchema
// const { authenticate } = require("../../middleware/authenticate");

router.post("/", (req, res) => {
  const data = req.body;
  // const userID = req.user.id;
  // Project.create({codeBlock:data.codeBlock, description:data.description, author:userID}).then((sting) =>
  Project.create(data).then((project) =>
    res.json({
      status: 200,
      stings: project,
      // user: userID,
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
router.delete("/:id", (req, res) => {
    Project.findByIdAndDelete(req.params.id).then((project) => {
    res.json({
      status: 200,
      msg: "Item deleted.",
      project: project,
    });
  });
});

module.exports = router;
