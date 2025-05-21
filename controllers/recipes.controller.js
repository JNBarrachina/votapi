const { text } = require("express");
const {Recipe} = require("../models/Recipe");

const {GoogleGenAI, Type} = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: "API_KEY" });

const getUserRecipes = async (req, res) => {
    // #swagger.tags = ['Recipes']

    res.send("La IA crea las recetas");
}

const getNewRecipes = async (req, res) => {
    // #swagger.tags = ['Recipes']

    const [...recipeIngredients] = req.body.ingredients;

    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:`Dame una receta con los siguientes ingredientes: ${recipeIngredients}. La receta debe ser sintética, no hagas introducción`,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
            name: { type: "string" },
            ingredients: { type: "string" },
            difficulty: { type: "string" },
            cookingTime: { type: "string" },
            description: { type: "string" }
            },
        }, 
        propertyOrdering: ["name", "ingredients", "difficulty", "cookingTime", "description"]
        }
    }
    });

    res.send(response,text);
}

module.exports = {getUserRecipes, getNewRecipes};