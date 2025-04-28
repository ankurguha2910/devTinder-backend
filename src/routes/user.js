const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const { User } = require("../models/user");

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

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page -1)*limit;
        //Find all connection that have been (sent + received)
        const data = await ConnectionRequestModel.find({
            $or: [
                {fromUserId: loggedinUser._id},
                {toUserId: loggedinUser._id}
            ]
        }).select(["fromUserId", "toUserId"]);

        const hideFromFeed = new Set();
        //add elements to the Set for keeping unique elements in string format
        data.forEach((row) => {
            hideFromFeed.add(row.fromUserId.toString());
            hideFromFeed.add(row.toUserId.toString());
        });
        
        const users =  await User.find({
            $and: [
                {_id: { $nin: Array.from(hideFromFeed) }},
                {_id: { $ne: loggedinUser._id }}
            ]
        }).select(["firstName", "lastName", "age", "skills", "about", "photoURL"]).skip(skip).limit(limit);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: "ERROR : "+error.message});
    }
    
})
module.exports = { userRouter }