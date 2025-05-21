const port = 8080;

const express = require("express");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const {dbConnect} = require("./db");

const usersRouter = require("./routes/users.routes");
const ingredientsRouter = require("./routes/ingredients.routes");
const recipesRouter = require("./routes/recipes.routes");

const {authMiddleware} = require("./middlewares/auth");

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/users", usersRouter);
    app.use("/ingredients", authMiddleware, ingredientsRouter);
    app.use("/recipes", recipesRouter);

    dbConnect();

    app.listen(port, () => {
        console.log(`Escuchando...`);
    });
}

main();