const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json()); //middleware to parse the req.body data in JSON format
app.use(cookieParser()); //middleware to parse the token sent from client side to server side inside a cookie

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const { userRouter } = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
.then(() => {
    console.log("Databse connection established successfully.");
    app.listen(8888, () => {
        console.log("Server is listening on port 8888...");
    });
})
.catch((err) => {
    console.log(err.message);
})