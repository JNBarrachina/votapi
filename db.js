const mongoose =  require("mongoose");
const {MONGO_URI} = require("./config/config");

const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conexión a la BD exitosa");
    } catch (error) {
        console.error(error);
        throw new Error("Error de conexión a la BD");
    }
}

exports.dbConnect = dbConnect;