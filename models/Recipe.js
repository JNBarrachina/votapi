const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const recipeSchema = new Schema({
    name: {type: String, required: true},
    ingredients: {type: String, required: true},
    difficulty: {type: String, required: true},
    cookingTime: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {Recipe};