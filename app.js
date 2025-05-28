const express = require('express');
const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello World");
})
app.use("/test", (req, res) => {
    res.send("Test");
})
app.use("/", (req, res) => {
    res.send("Vikash");
})

app.listen(3333, () => {
    console.log("server running on port 3333");
})