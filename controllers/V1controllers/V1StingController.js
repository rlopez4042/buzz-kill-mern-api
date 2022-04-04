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
  Sting.findByIdAndUpdate(req.params.id, req.body).then((sting) => {
    const data = sting.authorID;
    const userID = req.user.id;
    if (data == userID) {
      res.json({
        status: 200,
        msg: "Item updated.",
        sting: sting,
        id: data,
      });
    } else {
      console.log("Cannot patch.")
    }
  });
});

//Delete one sting by ID
router.delete("/:id", authenticate, (req, res) => {
  Sting.findByIdAndDelete(req.params.id).then((sting) => {
    const data = sting.authorID;
    const userID = req.user.id;
    if (data == userID) {
      res.json({
        status: 200,
        msg: "Item deleted.",
        sting: sting,
        id: data,
      });
    } else {
      console.log("Cannot delete.")
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
router.get("/allSolutions/:id", authenticate, (req, res) => {
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
  // authenticate,
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

//*--* Some working functionality for after V1 completion. *--*//

//Read all stings by authorID so users can see their own tickets
router.get("/project/:projectID", 
  (req, res) => {
    Sting.find({ projectID: { _id: req.params.projectID } } ).then((stings) => {
      res.json({
        status: 200,
        sting: stings,
      });
    });
  }
);

// Read all stings by authorID so users can see their own tickets
router.get("/profile/:authorID", 
  (req, res) => {
    Sting.find({ authorID: { _id: req.params.authorID } }).then((stings) => {
      res.json({
        status: 200,
        sting: stings,
      });
    });
  }
);

module.exports = router;
