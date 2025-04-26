const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const data = await ConnectionRequestModel.find({
            toUserId: loggedinUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"]);
        
        res.status(200).json({message: "The pending connection request(s) :", data});
    } catch (error) {
        res.status(400).json({message: "ERROR : "+error.message});
    }
})

userRouter.get("/user/connections" , userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const coonectionRequestData = await ConnectionRequestModel.find({
            $or: [
                {fromUserId: loggedinUser._id, status: "accepted"},
                {toUserId: loggedinUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", ["firstName", "lastName", "photoURL", "skills"]).populate("toUserId", ["firstName", "lastName", "photoURL", "skills"]);

        const data = coonectionRequestData.map((row) => {
            if(row.fromUserId._id.toString() === loggedinUser._id.toString())
            {
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.status(200).json({message: "The connections : ", data});
    } catch (error) {
        res.status(400).json({message: "ERROR : "+error.message});
    }
})
module.exports = { userRouter }