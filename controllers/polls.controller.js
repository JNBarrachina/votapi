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
    if (req.user.adminRole === false) {
        res.status(401).send("Unauthorized to create new polls");
        return;
    }

    try {
        const options = req.body.options.map((option, index) => ({
            id: index + 1, // o puedes utilizar un UUID si lo prefieres
            value: option,
        }));

        const newPoll = new Poll({ ...req.body, options, createdBy: req.user.username });
        await newPoll.save();
        res.json(newPoll);
    } catch (error) {
        console.log(error);
        res.status(400).send("Unexpected error");
    }
}

const updatePoll = async (req, res) => {
    const pollId = await Poll.findById(req.params.id);
    const userChoice = req.body.userChoice;

    const userVote = { userId: req.user._id, vote: userChoice };

    const existingVote = await Poll.findOne({ _id: pollId, "votes.userId": req.user._id });
    if (existingVote) {
        return res.status(400).send("You have already voted in this poll.");
    }

    const updatedPoll = await Poll.findByIdAndUpdate(pollId, {$push: { votes: userVote }});
    res.json(updatedPoll);
}

const closePoll = async (req, res) => {
    if (req.user.adminRole === false) {
        res.status(401).send("Unauthorized to close polls");
        return;
    }

    try {
        const pollId = await Poll.findById(req.params.id);
        const updatedPoll = await Poll.findByIdAndUpdate(pollId, { status: "Closed"});
        res.json(updatedPoll);
    } catch (error) {
        console.log(error);
        res.status(400).send("Unexpected error");
    }
}

const deletePoll = async (req, res) => {
    const deletedPoll = await Poll.findByIdAndDelete({pollId: req.params.id});
    res.json(deletedPoll);
}

const getPollResults = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    
    const pollResults = poll.votes.reduce((acc, vote) => {
    if (vote.vote !== null) {
        const optionId = vote.vote;
        if (!acc[optionId]) {
            acc[optionId] = 1;
        } else {
            acc[optionId]++;
        }
    }
    return acc;
    }, {});

    res.json(pollResults);
}

module.exports = { getPoll, getDashboard, createPoll, updatePoll, closePoll, deletePoll, getPollResults };