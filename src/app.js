const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const app = express();

app.post("/signup", async (req, res, next) => {
    const userObj = {
        firstName: "Ankur",
        lastName: "Guha",
        emailID: "ankur.guha16@gmail.com",
        password: "*Kolkata2025",
        age: 31,
        gender: "Male"
    }
    try{
        //Creating a new instance of the User model
        const user = new User(userObj);
        await user.save();
        res.status(200).send("User added successfully");
    }catch(err) {
        res.status(400).send(err.message)
    }  
})

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