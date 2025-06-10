const express = require('express');
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionReq");
const User = require('../model/user');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


userRouter.get("/user/requests/received",  userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
    
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName");


        if(connectionRequests){
            return res.status(200).json({
                connectionRequests
            })
        }

    }
    catch(err){
        console.error("ERROR :", err.message)
    }


});

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => row.fromUserId);

         res.status(200).json({
                data,
        });

    }
    catch(err){
        console.error("ERROR :", err.message);
    }
})

userRouter.get("/user/feed", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        //pagination logic
        const page = parseInt(req.query.page || 1);
        let limit = parseInt(req.query.limit || 10);
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        //Fetch connections request
        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");


        // give unique id connection
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
        // remove connection & own
        const users = await User.find({
            $and: [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);

    }
    catch(err){
        console.error("ERROR :", err.message);
    }
})

module.exports = userRouter;