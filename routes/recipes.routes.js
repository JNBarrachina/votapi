const express = require("express");
const {getUserRecipes, getNewRecipes} = require("../controllers/recipes.controller")
const router = express.Router();

router.get("/", getUserRecipes);
router.post("/", getNewRecipes);

module.exports = router;