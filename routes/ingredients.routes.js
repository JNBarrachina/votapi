const express = require("express");
const {getIngredients, addIngredient, updateIngredient, removeIngredient} = require("../controllers/ingredients.controller")
const router = express.Router();

router.get("/", getIngredients);
router.post("/", addIngredient);
router.put("/", updateIngredient);
router.delete("/", removeIngredient);

module.exports = router;