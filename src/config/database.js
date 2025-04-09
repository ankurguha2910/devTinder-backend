const mongoose = require("mongoose");

const connectDB = async () => {
    //The connection string should have the specific database name with which we want to connect or else it will connect to the cluster only
    await mongoose.connect("mongodb+srv://ankurguha16:cCFeoWNGXvn81QtR@namaste-node.oiauvyk.mongodb.net/devTinder");
}

module.exports = { connectDB }
