const express = require("express");
const router = express.Router();
const Sting = require("./../models/StingSchema");
// const Solution = require("./../models/SolutionSchema")
const authenticate = require("../middleware/authenticate");

//Create Sting
router.post("/", authenticate, (req, res) => {
  const data = req.body;
  Sting.create(data).then((sting) =>
    res.json({
      status: 200,
      sting: sting,
    })
  );
});

//Read all Stings
router.get("/", authenticate, (req, res) => {
  Sting.find().then((stings) =>
    res.json({
      status: 200,
      stings: stings,
    })
  );
});

//Read one by ID
router.get("/:id", authenticate, (req, res) => {
  Sting.findById(req.params.id).then((sting) => {
    res.json({
      status: 200,
      sting: sting,
    });
  });
});

//Update one by ID
router.patch("/:id", authenticate, (req, res) => {
  Sting.findByIdAndUpdate(req.params.id, req.body).then((sting) => {
    res.json({
      status: 200,
      msg: "item update",
      sting: sting,
    });
  });
});

//Delete one Sting by ID
router.delete("/:id", (req, res) => {
  Sting.findByIdAndDelete(req.params.id).then((sting) => {
    res.json({
      status: 200,
      sting: sting,
    });
  });
});

//Add solution to Sting
router.put("/:id/add", authenticate, (req, res) => {
  Sting.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { solutions: req.body } },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

//Edit a solution
router.put("/:id/edit/:solutionsID", async (req, res) => {
  Sting.findByIdAndUpdate(
    { _id: req.params.id },
    { solutions: {_id: req.params.solutionsID} },
    { $push: req.body },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

//Delete a solution
router.put("/:id/delete/:solutionsID", async (req, res) => {
  Sting.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { solutions: {_id: req.params.solutionsID} } },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

module.exports = router;
