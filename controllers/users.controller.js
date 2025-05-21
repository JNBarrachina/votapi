const {User} = require("../models/User");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const loginUser = async (req, res) => {
    // #swagger.tags = ['Users']

    const {username, password} = req.body;

    const existingUser = await User.findOne(
        {username: username}
    );
    if (!existingUser){
        res.status(400).send("El usuario no existe");
        return;
    }

    const passwordMatch = bcryptjs.compareSync(password, existingUser.password);
    if (!passwordMatch){
        res.status(400).send("Contraseña incorrecta");
        return;
    }
    else{
        const accessToken = jwt.sign({ userId: existingUser._id}, JWT_SECRET);

        res.status(201).send({accessToken});
    }
}

const registerUser = async (req, res) => {
    // #swagger.tags = ['Users']

    const {name, username, password, email, country} = req.body
    const hashedPassword =  bcryptjs.hashSync(password);

    const checkUsername = await User.findOne(
        {username: username}
    );
    if (checkUsername){
        res.status(400).send("El nombre de usuario ya está siendo utilizado");
        return;
    }

    try {
        const createdMember = new User(
            {
                name: name,
                username: username,
                password: hashedPassword,
                email: email,
                country: country
            }
        )

        await createdMember.save();
        res.status(201).send("Usuario registrado");
    } catch (error) {
        console.log(error);
        res.status(400).send("Unexpected error");
    }
}

module.exports = { loginUser, registerUser };