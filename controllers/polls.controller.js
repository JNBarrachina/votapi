const {Poll} = require("../models/Poll");

const getPoll = async (req, res) => {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
        res.status(404).send("No se ha encontrado una encuesta con ese ID");
        return;
    }

    const pollData = {
            createdBy: poll.createdBy,
            status: poll.status,
            question: poll.question,
            description: poll.description,
            options: poll.options,
            createdAt: poll.createdAt,
            endDate: poll.endDate
    };

    res.json(pollData);
    
}

const votePoll = async (req, res) => {
    const pollId = await Poll.findById(req.params.id);

    if (!pollId) {
        res.status(404).send("Poll not found");
        return;
    }

    if (pollId.status !== "Open") {
        res.status(400).send("Poll is closed");
        return;
    }

    const existingVote = await Poll.findOne({ _id: pollId, "votes.userId": req.user._id });
    if (existingVote) {
        res.status(400).send("You have already voted in this poll.");
        return;
    }

    const userChoice = req.body.userChoice;
    const userVote = { userId: req.user._id, vote: userChoice };

    try {
        const insertNewVotetoPoll = await Poll.findByIdAndUpdate(pollId, {$push: { votes: userVote }});
        res.send("Voted successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Unexpected error");
    }
}

const createPoll = async (req, res) => {
    if (req.user.adminRole === false) {
        res.status(401).send("Unauthorized to create new polls");
        return;
    }

    try {
        const options = req.body.options.map((option, index) => ({
            id: index + 1, 
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
    if (req.user.adminRole === false) {
        res.status(401).send("Unauthorized to update polls");
        return;
    }

    try {
        const pollId = await Poll.findById(req.params.id);
        const updatedPoll = await Poll.findByIdAndUpdate(pollId, req.body);
        res.json(updatedPoll);
    } catch (error) {
        console.log(error);
        res.status(400).send("Unexpected error");
    }
}

const closePoll = async (req, res) => {
    if (req.user.adminRole === false) {
        res.status(401).send("Unauthorized to close polls");
        return;
    }

    try {
        const pollId = await Poll.findById(req.params.id);
        const updatedPoll = await Poll.findByIdAndUpdate(pollId, { status: "Closed", endDate: new Date() });
        res.send("Poll closed");
    } catch (error) {
        console.log(error);
        res.status(400).send("Unexpected error");
    }
}

const deletePoll = async (req, res) => {
    if (req.user.adminRole === false) {
        res.status(401).send("Unauthorized to remove polls");
        return;
    }

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

module.exports = { getPoll, votePoll, createPoll, updatePoll, closePoll, deletePoll, getPollResults, getDashboard };