const {Poll} = require("../models/Poll");

const getPoll = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    res.json(poll);
}

const createPoll = async (req, res) => {
    if (req.user.adminRole === true) {
        try {
            const newPoll = new Poll({...req.body, createdBy: req.user.username});
            await newPoll.save();
            res.json(newPoll);
            
        } catch (error) {
            console.log(error);
            res.status(400).send("Unexpected error");
        }
    }
    else {
        res.status(401).send("Unauthorized");
        return;
    }
}

const updatePoll = async (req, res) => {
    const updatedPoll = await Poll.findOneAndUpdate({pollId: req.body.pollId}, req.body);
    res.json(updatedPoll);
}

const deletePoll = async (req, res) => {
    const deletedPoll = await Poll.findOneAndDelete({pollId: req.body.pollId});
    res.json(deletedPoll);
}

module.exports = { getPoll, createPoll, updatePoll, deletePoll}