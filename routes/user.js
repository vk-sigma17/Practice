const express = require('express');
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionReq");

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

module.exports = userRouter;