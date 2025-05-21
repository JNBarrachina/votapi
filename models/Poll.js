const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const pollSchema = new Schema({
    pollId: {type: String, required: true, unique: true},
    status: {type: String, required: true},
    createdby: {type: String, required: true},
    question: {type: String, required: true},
    description: {type: String, required: true},
    options: {type: Array, required: true},
    votes: {type: Array, required: true},
    userVotes: {type: Array, required: true},
    totalVotes: {type: Number, required: true},
    endDate: {type: Date, required: true},
    results: {type: Array, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = {Poll};