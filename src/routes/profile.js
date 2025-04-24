const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(401).send("ERROR : " + error.message)
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.json({message: loggedInUser.firstName + ", your profile has been updated successfully.", data: loggedInUser});
    } catch (error) {
        res.status(401).send("ERROR : " + error.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { newPassword } = req.body;
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();
        res.json({message: "Your password has been reset successfully.", status: true});
    } catch (error) {
        res.status(404).send("ERROR : " + error.message);
    }  
})

module.exports = { profileRouter }