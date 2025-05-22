const {Poll} = require("../models/Poll");

const getPoll = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    res.json(poll);
}

const getDashboard = async (req, res) => {
    if (req.user.adminRole === true) {
        try {
            const allPolls = await Poll.find();
            res.json(allPolls); 
        } catch (error) {
            console.log(error);
            res.status(400).send("Unexpected error");
        }
    }
    else {
        res.status(401).send("Unauthorized to get dashboard");
        return;
    }
    
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
        res.status(401).send("Unauthorized to create new polls");
        return;
    }
}

const updatePoll = async (req, res) => {
    const updatedPoll = await Poll.findByIdAndUpdate({pollId: req.params.id}, req.body);
    res.json(updatedPoll);
}

const deletePoll = async (req, res) => {
    const deletedPoll = await Poll.findByIdAndDelete({pollId: req.params.id});
    res.json(deletedPoll);
}

module.exports = { getPoll, getDashboard, createPoll, updatePoll, deletePoll }