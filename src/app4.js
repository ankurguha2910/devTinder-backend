const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");

const app = express();

//Handle auth middleware to check if the user is authorized or not
app.use("/admin", adminAuth)

app.get("/user/login", (req, res) => {
    res.send("User logged in successfully");
});

app.get("/user", userAuth, (req, res) => {
    res.send("User detail sent");
});

app.use("/admin/getAllData", (req, res, next) => {
    res.send("All data sent");
})

app.use("/admin/deleteUser", (req, res, next) => {
    res.send("User deleted");
})

app.listen(6666, () => {
    console.log("Server is listening on port number 6666...");
})