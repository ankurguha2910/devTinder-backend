const express = require("express");

const app = express();

//Express.js server on receving a request checks all the app.xxx("matching route") functions

app.use("/", (req, res, next) => {
    //res.send("Handling / route")
    next();
})

app.get("/user", (req, res, next) => {
    console.log("1st route handler");
    //res.send("Response 1");
    next();
});

app.get("/user", (req, res) => {
    console.log("2nd route handler");
    res.send("2nd response");
});

app.listen(7777, () => {
    console.log("Server is up and running on port 7777...");
});