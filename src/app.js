const express = require("express");

const app = new express();

// The callback function defined inside the app.use() is known as request handler

app.use("/test", (req,res) => {
    res.send("Test request");
});

app.use("/hello", (req,res) => {
    res.send("Hello from server");
});

app.use("/", (req,res) => {
    res.send("Welcome to Node.js");
});

app.listen(7001, () => {
    console.log("Server is up and running...")
});