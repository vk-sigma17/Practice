
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

const validateLoginData = (req, res) => {
    const {email, password} = req.body;
    if(!validator.isEmail(email)){
            throw new Error("Email is Not Valid");

    }
     if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password!");
    }
}

const validateEditProfileData = (req) => {
    const Allowed_Updates = [
            "firstName", "lastName", "age", "gender", "about"
        ];
        const isUpdateAllowed = Object.keys(req.body).every((k) => Allowed_Updates.includes(k));
        return isUpdateAllowed;
}
const validatePasswordData = (req) => {
	const { newPassword } = req.body;
	if (!validator.isStrongPassword(newPassword)) {
		throw new Error(
			"Password must be at least 8 characters long, contain a combination of uppercase and lowercase letters, numbers, and special characters"
		);
	}
};

module.exports = { ValidateSignUpData, validateEditProfileData, validateLoginData, validatePasswordData };