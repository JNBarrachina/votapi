const express = require("express");
const {getPoll, createPoll, updatePoll, deletePoll, closePoll, getDashboard, getPollResults} = require("../controllers/polls.controller")
const router = express.Router();

router.get("/:id", getPoll);
router.get("/results/:id", getPollResults);
router.get("/dashboard", getDashboard);

router.post("/", createPoll);

router.patch("/update/:id", updatePoll);
router.patch("/close/:id", closePoll);

router.delete("/", deletePoll);

module.exports = router;