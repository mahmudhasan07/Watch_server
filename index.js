const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const app = express()
require('dotenv').config()
var mysql = require('mysql');
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    res.send("Welcome to the API server")
})

console.log(process.env.Host_API);

var con = mysql.createConnection({
    host: process.env.Host_API,
    user: process.env.User_ID,
    password: process.env.User_Password
});

con.connect(function (err) {
    if (err) return err;
    console.log("Connected!");
});


app.post("/products", async (req, res) => {
    const data = req.body

})



app.listen(port, () => {
    console.log(`The server is running at ${port}`);
})