const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address :" + value);
            }
        }  
    },
       password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter A Strong Password!")
            }
        } 
    },
    age:{
        type: Number,
        min: 18,
        // required: true
    },
    gender: {
        type: String,
        trim: true,
        validate: function (value){
            if(!["Male", "Female", "Other"].includes(value)){
                throw new Error("Not a valid gender (Male , Female and other)")
            }
        }
        // enum: ["Male", "Female", "Other"]
    },
    about: {
        type: String,
        default: "Dev is looking for someone"
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;