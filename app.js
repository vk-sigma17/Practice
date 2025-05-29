const express = require('express');
const app = express();
const { userAuth } = require('./middleware/auth');

// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params)
//     res.send("Hello World");
// })

// app.post("/", (req, res) => {
//     res.send({
//         name: "vikash",
//         age: 26
//     });
// })
// app.delete("/", (req, res) => {
//     res.send("Data Deleted Successfully!");
// })

// 1st
// app.use("/user", (req, res, next) => {
//     console.log("This is 1st Response!!");
//     res.send("Response 1");
//     next();
// }, (req, res) => {
//     res.send("response 2")
// })

// 2nd
// app.get("/skip", (req, res, next) => {
//     console.log("this handler will be skipped!")
//     next('route');
// }, (req, res) => {
//     res.send("You will not see this");
// })
// app.get("/skip", (req, res) => {
//     res.send("You will see this from 2nd Route")
// })

// Auth
// app.use("/user", userAuth,
//     (req, res, next) => {
//         console.log("handling Router 1");
//         next();
//     },
//     (req, res, next) => {
//         console.log("handling Router 2");
//         next();
//     },
//     (req, res) => {
//         res.send("Router 3");
//     }
// );


// Error handling 
app.get("/user", (req, res) => {
    try{
        throw new Error("DNNDNDNDN");
        console.log("user Data Sent");
    }
    catch(err){
        res.status(500).send("some Error Occur");
    }
} )

app.listen(3333, () => {
    console.log("server running on port 3333");
})