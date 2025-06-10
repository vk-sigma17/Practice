const express = require('express');
const app = express();
// const { ValidateSignUpData } = require("./utils/validation");
// const mongooose = require('mongoose');
const { connectDB } = require('./config/database');
// const User = require('./model/user');
// const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
// const jwt = require('jsonwebtoken');
// const { userAuth } = require("./middleware/auth");
// const { userAuth } = require('./middleware/auth');

app.use(express.json()); //middleware to convert json data in js object.
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require("./routes/Profile");
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)

// app.post("/signup", async (req, res) => {
//     ValidateSignUpData(req)
//     try{
//         const {firstName, lastName, email, password} = req.body;

//         const hashedPassword = await bcrypt.hash(password, 12);
//         // console.log("ABC :", hashedPassword);
        
//         const newUser = new User({firstName, lastName, email, password: hashedPassword});
//         await newUser.save();
//         res.status(201).send("User created successfully!");
//     }
//     catch(err){
//         console.error("error occured :", err);
//         res.status(500).send("Something went wrong!");
//         return;
//     }
// })

// // Login Api
// app.post("/login", async(req, res) => {
//     try{
//         const {email, password} = req.body;
//         // find user based on email
//         const user = await User.findOne({email: email});
//         if(!user){
//             res.status(404).send({ error: "Invalid credentials" });
//         }
//         // const isPasswordValid = await bcrypt.compare(password, user.password); //password from user exxtracted by email
       
//        const isPasswordValid = await user.validatePassword(password);
//         if(isPasswordValid){
//             // creating token & storing in cookie
//             // const token = await jwt.sign({_id: user._id}, "sigma@12345", {expiresIn: '1d'});
//             const token = await user.getJWT();
//             // console.log(token);
//             res.cookie("token", token, {
//                 expires: new Date(Date.now() + 8 * 3600000)
//             });
//             res.send("Login SuccessFully!");
//         }else{
//             res.status(404).send({ error: "Invalid credentials" });
//         }
//     }
//     catch(err){
//         console.error("ERROR :", err.message);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// })

// get one user by email id
// app.get("/profile", userAuth, async(req, res) => {
//     try{
        
//         res.send(req.user);
//     }
//     catch(err){
//         console.error("Error fetching user:", err);
//         res.status(500).send("Server error");    }
// }) 

//  Find All
// app.get("/getAll", async(req, res) => {
//     try{
//         const allUser = await User.find();
//         if(!allUser){
//             res.status(404).send("No User Found!");
//         }
//         res.send(allUser);
//     }catch(err){
//         res.status(500).send("something went wrong!")
//     }
// })

// delete one
// app.delete("/deleteOne", async(req, res) => {
//     try{
//         const oneUser = await User.deleteOne({email: "vicky123"});
//         if(!oneUser){
//             res.status(404).send("No user Found!");
//         }
//         res.send({
//             message: "User Deleted Successfully!",
//             oneUser
//         });
//     }
//     catch(err){
//         console.error("Error fetching user:", err);
//         res.status(500).send("Server error");    }
// }) 

// update using patch (specific part)
// app.patch("/updateUser", async (req, res) => {
//     const userId = req.body._id;
//     const data = req.body;
//     try{
//         const Allowed_Updates = [
//             "firstName", "lastName", "age", "gender", "about"
//         ];
//         const isUpdateAllowed = Object.keys(data).every((k) => Allowed_Updates.includes(k));

//          if (!isUpdateAllowed) {
//           throw new Error("Update Not Allowed")
//       }

//         const updatedUser = await User.findByIdAndUpdate(userId, data, {new: true}, {runValidators: true });
//         if(!updatedUser){
//             res.status(404).send("No user Found!");
//         }
//         res.send(updatedUser);
//     }
//     catch(err){
//         res.status(500).send(err.message);
//     }
// })

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
