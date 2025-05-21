const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const pollSchema = new Schema({
    createdBy: {type: String, required: true},
    status: {type: String, default: "open"},
    question: {type: String, required: true},
    description: {type: String},
    options: {type: Array, required: true},
    votes: {type: Array},
    userVotes: {type: Array},
    totalVotes: {type: Number, default: 0},
    endDate: {type: Date},
    createdAt: { type: Date, default: Date.now }
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = {Poll};