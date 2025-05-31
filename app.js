const express = require('express');
const app = express();
// const { userAuth } = require('./middleware/auth');
const mongooose = require('mongoose');
const { connectDB } = require('./config/database');
const User = require('./model/user');

app.use(express.json()); //middleware to convert json data in js object.

app.post("/signup", async (req, res) => {
    try{
        // const newUser = new User({
            //     firstName: "vikash",
            //     lastName: "khowal",
            //     email: "khowal123",
            //     age: 26
            // });
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send("User created successfully!");
    }
    catch(err){
        console.error("error occured :", err);
        res.status(500).send("Something went wrong!");
        return;
    }
})

connectDB()
    .then(() => {
        console.log("Database Connecting...");
        app.listen(3333, () => {
            console.log("server running on port 3333");
        })

    })
    .catch((err) => {
        console.error("Database connection Failed!")
    })
