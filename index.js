const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async(req,res)=>{
    res.send("Welcome to the API server")
})

app.get("/products", async(req,res)=>{
    res.send("no data")
})



app.listen(port,()=>{
    console.log(`The server is running at ${port}`);
})