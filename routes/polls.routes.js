const express = require("express");
const {getPoll, createPoll, updatePoll, deletePoll, getDashboard} = require("../controllers/polls.controller")
const router = express.Router();

router.get("/:id", getPoll);
router.get("/dashboard", getDashboard);
router.post("/", createPoll);
router.put("/:id", updatePoll);
router.delete("/", deletePoll);

module.exports = router;