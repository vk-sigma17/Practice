const express = require('express');
const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params)
    res.send("Hello World");
})

app.post("/", (req, res) => {
    res.send({
        name: "vikash",
        age: 26
    });
})
app.delete("/", (req, res) => {
    res.send("Data Deleted Successfully!");
})

app.listen(3333, () => {
    console.log("server running on port 3333");
})