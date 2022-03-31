const express = require("express");
const router = express.Router();
const Sting = require("../../models/V1models/V1StingSchema.js");
const {authenticate} = require("../../middleware/authenticate");

//-------------------------------------------- * Sting Routes * -------------------------------------------- //

//Create project
router.post("/", 
// authenticate, 
(req, res) => {
  const data = req.body;
  Sting.create(data).then((sting) =>
    res.json({
      status: 200,
      sting: sting,
    })
  );
});

//Read all stings
router.get("/", (req, res) => {
    Sting.find().then((stings) =>
    res.json({
      status: 200,
      stings: stings,
    })
  );
});

//Read one sting by ID
router.get("/:id", 
// authenticate, 
(req, res) => {
    Sting.findById(req.params.id).then((sting) => {
    res.json({
      status: 200,
      sting: sting,
    });
  });
});

//Update one sting by ID
router.patch("/:id", 
// authenticate, 
(req, res) => {
    Sting.findByIdAndUpdate(req.params.id, req.body).then((sting) => {
    res.json({
      status: 200,
      msg: "Item updated.",
      sting: sting,
    });
  });
});

//Delete one sting by ID
router.delete("/:id", 
// authenticate, 
(req, res) => {
    Sting.findByIdAndDelete(req.params.id).then((sting) => {
    res.json({
      status: 200,
      sting: sting,
    });
  });
});

//-------------------------------------------- * Solution Routes * -------------------------------------------- //

//Create
//Add solution to a sting
router.put("/addSolution/:id", 
// authenticate, 
(req, res) => {
    Sting.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { solutions: req.body } },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

//Read
//Find all solutions for a sting
router.get("/allSolutions/:id", 
// authenticate, 
(req, res) => {
    Sting.findById(req.params.id).then((sting) => {
    res.json({
      status: 200,
      solutions: sting.solutions,
    });
  });
});

//*--* Add upate functionality after V3 completion. *--*//

//Delete
//Delete a solution
router.put("/deleteSolution/:id/:solutionsID", 
// authenticate, 
async (req, res) => {
    Sting.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { solutions: { _id: req.params.solutionsID } } },
    { new: true }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

module.exports = router;