const express = require("express");
const {getPoll, createPoll, updatePoll, deletePoll} = require("../controllers/polls.controller")
const router = express.Router();

router.get("/", getPoll);
router.post("/", createPoll);
router.put("/", updatePoll);
router.delete("/", deletePoll);

module.exports = router;