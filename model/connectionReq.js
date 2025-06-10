const mongoose = require("mongoose");

const connectionReqSchema  =  mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is not a valid status`
        }
    }
})

connectionReqSchema.pre("save", function(next) {
    if(this.fromUserId.equals(this.toUserId)){
         throw new Error("cannot send connection request to userself!!");
    }
    next()
})

// indexing will make Query Fast
connectionReqSchema.index({fromUserId: 1, toUserId: 1});

const ConnectionRequest = mongoose.model("connectionRequest",connectionReqSchema);

module.exports = ConnectionRequest;