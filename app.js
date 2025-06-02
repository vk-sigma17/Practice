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

// get one user by email id
app.get("/getOne", async(req, res) => {
    try{
        const oneUser = await User.findOne({email: "vicky123"});
        if(!oneUser){
            res.status(404).send("No user Found!");
        }
        res.send(oneUser);
    }
    catch(err){
        console.error("Error fetching user:", err);
        res.status(500).send("Server error");    }
}) 

//  Find All
app.get("/getAll", async(req, res) => {
    try{
        const allUser = await User.find();
        if(!allUser){
            res.status(404).send("No User Found!");
        }
        res.send(allUser);
    }catch(err){
        res.status(500).send("something went wrong!")
    }
})

// delete one
app.delete("/deleteOne", async(req, res) => {
    try{
        const oneUser = await User.deleteOne({email: "vicky123"});
        if(!oneUser){
            res.status(404).send("No user Found!");
        }
        res.send({
            message: "User Deleted Successfully!",
            oneUser
        });
    }
    catch(err){
        console.error("Error fetching user:", err);
        res.status(500).send("Server error");    }
}) 

// update using patch (specific part)
app.patch("/updateUser", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;
    try{
        const Allowed_Updates = [
            "firstName", "lastName", "age", "gender", "about"
        ];
        const isUpdateAllowed = Object.keys(data).every((k) => Allowed_Updates.includes(k));

         if (!isUpdateAllowed) {
          throw new Error("Update Not Allowed")
      }

        const updatedUser = await User.findByIdAndUpdate(userId, data, {new: true}, {runValidators: true });
        if(!updatedUser){
            res.status(404).send("No user Found!");
        }
        res.send(updatedUser);
    }
    catch(err){
        res.status(500).send(err.message);
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
