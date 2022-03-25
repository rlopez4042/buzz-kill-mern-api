const express = require("express");
const Sting = require('./../models/Sting');
const router = express.Router();

router.get("/", (req, res) => {
    Sting.find()
        .then((stings => res.json({
            status: 200,
            stings: stings
        })))
})

module.exports = router;