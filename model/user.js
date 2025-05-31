const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        min: 18,
        // required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;