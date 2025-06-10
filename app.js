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
