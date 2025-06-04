
const validator = require('validator');

const ValidateSignUpData = (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is Not Valid");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is Not Valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password!");
    }
}

module.exports = { ValidateSignUpData };