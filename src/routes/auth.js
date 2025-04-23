const express = require("express");
const { User } = require("../models/user");
const { validateData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

//Signup API - POST /signup - registers a new user into the database
authRouter.post("/signup", async (req, res) => {
    try {
        validateData(req);
        const { firstName, lastName, emailID, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailID,
            password : hashPassword
        });

        await user.save();
        res.send("User created successfully");
    } catch (error) {
        res.status(404).send("ERROR : " + error.message);
    } 
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailID, password } = req.body;
        const user = await User.findOne({emailID: emailID});
        if(!user)
        {
            throw new Error("Invalid credentials");
        }
        const verifyPassword = await user.validatePassword(password);
        if(!verifyPassword)
        {
            throw new Error("Invalid credentials");
        }
        // creating a dummy token
        // res.cookie('token','fhjbjvhjvvjhv!@#ythg54515445ghdghfgjhfjhvhjv516546546./dydy');
        //creating a JsonWebToken (jwt)
        const token = await user.getJWT();
        res.cookie("token", token, {expires: new Date(Date.now() + 7 * 24 * 3600000)});
        res.send("Login successfull!!!");
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

module.exports = { authRouter };