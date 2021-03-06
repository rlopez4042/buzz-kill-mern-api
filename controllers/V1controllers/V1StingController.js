const express = require("express");
const router = express.Router();
const Sting = require("../../models/V1models/V1StingSchema.js");
const { authenticate } = require("../../middleware/authenticate");

//-------------------------------------------- * Sting Routes * -------------------------------------------- //

//Create sting
router.post("/", authenticate, (req, res) => {
  const data = req.body;
  const userID = req.user.id;
  Sting.create(data).then((sting) =>
    res.json({
      status: 200,
      sting: sting,
      user: userID,
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
router.get(
  "/:id",
  // authenticate,
  (req, res) => {
    Sting.findById(req.params.id).then((sting) => {
      res.json({
        status: 200,
        sting: sting,
      });
    });
  }
);

//Update one sting by ID
router.patch("/:id", authenticate, (req, res) => {
  Sting.findById(req.params.id).then((sting) => {
    const data = sting.authorID;
    const userID = req.user.id;
    if (data == userID) {
      // Sting.updateOne(req.params.id, req.body).then((sting) => {
      Sting.findByIdAndUpdate(req.params.id, req.body).then((sting) => {
        res.json({
          status: 200,
          msg: "Item updated.",
          sting: sting,
          id: data,
        });
      });
    } else {
      console.log("Cannot patch.");
    }
  });
});

//Delete one sting by ID
router.delete("/:id", authenticate, (req, res) => {
  Sting.findById(req.params.id).then((sting) => {
    const data = sting.authorID;
    const userID = req.user.id;
    if (data == userID) {
      Sting.findByIdAndDelete(req.params.id).then((sting) => {
        res.json({
          status: 200,
          msg: "Item deleted.",
          sting: sting,
          id: data,
        });
      });
    } else {
      console.log("Cannot patch 123.");
    }
  });
});

//-------------------------------------------- * Solution Routes * -------------------------------------------- //

//Create
//Add solution to a sting
router.put("/addSolution/:id", authenticate, (req, res) => {
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

//Delete
//Delete a solution
router.put(
  "/deleteSolution/:id/:solutionsID",
  authenticate,
  async (req, res) => {
    Sting.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { solutions: { _id: req.params.solutionsID } } },
      { new: true }
    )
      .then((sting) => res.json({ status: 200, sting: sting }))
      .catch((error) => console.log(error));
  }
);

//*--* Some working functionality for after V2 completion. *--*//

//Delete all solution by ID within sting by ID within project by ID
router.get("/project/:id/:stingID/:solutionsID", (req, res) => {
  Sting.find(
    { _id: req.params.id, stingID: req.params.stingID },
    { $pull: { "stings.$[].solutions": { _id: req.params.solutionsID } } }
  ).then((stings) => {
    res.json({
      status: 200,
      sting: stings,
    });
  });
});

// Read all stings by authorID so users can see their own tickets
router.get("/profile/:authorID", (req, res) => {
  Sting.find({ authorID: { _id: req.params.authorID } }).then((stings) => {
    res.json({
      status: 200,
      sting: stings,
    });
  });
});

module.exports = router;
