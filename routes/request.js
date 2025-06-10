const express = require('express');
const { userAuth } = require('../middleware/auth');
const requestRouter = express.Router();

const User = require('../model/user');
const ConnectionRequest = require('../model/connectionReq');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) => {
        try{
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;
            console.log("abc", fromUserId);
            console.log("abc", toUserId);

            const Allowed_Status = ["ignored", "interested"];
            if(!Allowed_Status.includes(status)){
                return res.status(404).send("This Status Not Allowed!")
            }

            // check that toUserId exist
            const toUser = await User.findById(toUserId);
            if(!toUser){
                res.status(400).json({
                    message: "User Not Exist!"
                })
            }
            // check if there any already existing request
            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    {fromUserId, toUserId},
                    {fromUserId:toUserId,toUserId:fromUserId}
                ]
            })
            if(existingConnectionRequest){
                return res.status(400).json({message: "connection Request Already Exist!"});
            }


            const newConnectionRequest = new ConnectionRequest({fromUserId, toUserId, status});
            const data = await newConnectionRequest.save();
            res.json({
                message: "Connection Request Sent Successfully",
                data
            })


        }  
        catch(err){
            console.error(err);
            res.status(500).send("Something Went wrong!");
        }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const status = req.params.status;
        const requestID = req.params.requestId;

        

        const Allowed_Status = ["accepted", "rejected"];
        if(!Allowed_Status.includes(status)){
            return res.status(400).send("This Status is Not Allowed!")
        }
        const connectionRequestvalidation = await ConnectionRequest.findOne({
            _id:requestID,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if(!connectionRequestvalidation){
            return res.status(400).send({
                message: "ConnectionRequest Not exist!"
            })
        }
        connectionRequestvalidation.status = status;
        const data = await connectionRequestvalidation.save();

          res.status(200).json({
            message: "Connection request " + status,
            data,
            success: true,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).send("Something Went wrong!")
    }
})

module.exports = requestRouter;