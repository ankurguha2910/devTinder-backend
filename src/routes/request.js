const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const allowedStatus = ["interested", "ignored"];
        const status = req.params.status;
        const fromUserId = loggedInUser._id;
        const toUserId = req.params.userId;
        if(!allowedStatus.includes(status))
        {
            throw new Error("Invalid status type : "+status);
        }
        const user = await User.findOne({_id: toUserId});
        if(!user)
        {
            throw new Error("You are trying to send a connection request to an invalid user")
        }
        const existConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId: fromUserId}
            ]
        });
        if(existConnectionRequest)
        {
            throw new Error("Connection request has already been sent");
        }

        const newConnectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await newConnectionRequest.save();
        res.json({message: "Connection request has been sent successfully", status: true, code: 200});
    } catch (error) {
        res.json({message: error.message, status: false, code: 400});
    }
    
});

module.exports = { requestRouter }