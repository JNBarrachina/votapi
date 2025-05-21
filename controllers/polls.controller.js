const {Poll} = require("../models/Poll");

const getPoll = async (req, res) => {
    const polls = await Poll.find();
    res.json(polls);
}

const createPoll = async (req, res) => {
    const newPoll = new Poll(req.body);
    await newPoll.save();
    res.json(newPoll);
}

const updatePoll = async (req, res) => {
    const updatedPoll = await Poll.findOneAndUpdate({pollId: req.body.pollId}, req.body);
    res.json(updatedPoll);
}

const deletePoll = async (req, res) => {
    const deletedPoll = await Poll.findOneAndDelete({pollId: req.body.pollId});
    res.json(deletedPoll);
}

module.exports = {
    getPoll
    , createPoll
    , updatePoll
    , deletePoll
}