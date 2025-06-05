// ##authRouter 
// -POST /signup
// -POST /login
// -POST /logout

const express = require('express');
const authRouter = express.Router();

const { ValidateSignUpData } = require("../utils/validation");
const User = require("../model/user")
const bcrypt = require('bcrypt');


authRouter.post("/signup", async (req, res) => {
    ValidateSignUpData(req)
    try{
        const {firstName, lastName, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log("ABC :", hashedPassword);
        
        const newUser = new User({firstName, lastName, email, password: hashedPassword});
        await newUser.save();
        res.status(201).send("User created successfully!");
    }
    catch(err){
        console.error("error occured :", err);
        res.status(500).send("Something went wrong!");
        return;
    }
})

// Login Api
authRouter.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        // find user based on email
        const user = await User.findOne({email: email});
        if(!user){
            res.status(404).send({ error: "Invalid credentials" });
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password); //password from user exxtracted by email
       
       const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            // creating token & storing in cookie
            // const token = await jwt.sign({_id: user._id}, "sigma@12345", {expiresIn: '1d'});
            const token = await user.getJWT();
            // console.log(token);
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            });
            res.send("Login SuccessFully!");
        }else{
            res.status(404).send({ error: "Invalid credentials" });
        }
    }
    catch(err){
        console.error("ERROR :", err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
})

// Logout Api
authRouter.post('/logout', async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("User Logout Successfully!")
})

module.exports = authRouter;