const express = require("express");
const {getPoll, createPoll, updatePoll, deletePoll, closePoll, getDashboard, votePoll, getPollResults} = require("../controllers/polls.controller")
const router = express.Router();

router.get("/dashboard", getDashboard);

router.post("/new", createPoll);
router.put("/update/:id", updatePoll);
router.patch("/close/:id", closePoll);
router.delete("/delete/:id", deletePoll);

router.get("/:id", getPoll);
router.patch("/vote/:id", votePoll);
router.get("/results/:id", getPollResults);

module.exports = router;