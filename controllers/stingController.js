const express = require("express");
const router = express.Router();
const Sting = require("./../models/StingSchema");

//Create Sting
router.post("/", (req, res) => {
  const data = req.body;
  Sting.create(data).then((sting) =>
    res.json({
      status: 200,
      sting: sting,
    })
  );
});

//Read all Stings
router.get("/", (req, res) => {
  Sting.find().then((stings) =>
    res.json({
      status: 200,
      stings: stings,
    })
  );
});
//Read one by ID
router.get("/:id", (req, res) => {
  Sting.findById(req.params.id).then((sting) => {
    res.json({
      status: 200,
      sting: sting,
    });
  });
});

//Update one by ID
router.patch("/:id", (req, res) => {
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

router.put("/add/:id", (req, res) => {
  Sting.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: { solutions: req.body },
    },
    {
      new: true,
    }
  )
    .then((sting) => res.json({ status: 200, sting: sting }))
    .catch((error) => console.log(error));
});

module.exports = router;
