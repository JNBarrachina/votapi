const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
    pollId: {type: String, required: true},
    title: {type: String, required: true},
    createdby: {type: String, required: true, unique: true},
    choices: {type: Array, required: true},
    active: {type: Boolean, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Poll = mongoose.model("Poll", userSchema);

module.exports = {User};