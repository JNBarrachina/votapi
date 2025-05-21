const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ingredientSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    category: {type: String, required: true},
    quantity: {type: String, default: 1},
    unit: String,
    createdAt: { type: Date, default: Date.now },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = {Ingredient};