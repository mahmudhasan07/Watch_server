const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const app = express()
require('dotenv').config()
var mysql = require('mysql');
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(express.json())

app.get("/", async (req, res) => {
    res.send("Welcome to the API server")
})


var con = mysql.createConnection({
    host: process.env.Host_API,
    user: process.env.User_ID,
    password: process.env.User_Password,
    database: process.env.User_DataBase
});



app.get("/watches", async (req, res) => {
    const id = req.query
    console.log(id);
    let sql
    if (id.data == "desc" || id.data == "asc") {
        sql = `SELECT * FROM watch ORDER BY Watch_price ${id?.data}`
    } else {
        sql = `SELECT * FROM watch`
    }
    con.query(sql, (error, data) => {
        res.send(data)
        if (error) {
            console.log("error");
        }
    })
})

app.get("/watches/:id", async (req, res) => {
    const id = req.params.id
    // console.log(id);
    const sql = `SELECT * FROM watch WHERE Watch_name ='${id}'`
    con.query(sql, (err, result) => {
        // console.log(result[0]);
        res.send(result[0])

    })
})

app.get("/search/:brand", async (req, res) => {
    const data = req.params
    const sql = `SELECT * FROM watch WHERE Watch_brand = '${data?.brand}'`
    con.query(sql, (err, result) => {
        res.send(result)
        if (err) {
            res.send("error")
        }

    })
    console.log(data);
})

app.get("/trending", async(req,res)=>{
    const sql = `SELECT * FROM watch ORDER BY ID desc`
    con.query(sql, (error, result)=>{
        res.send(result)
    })
})


app.post("/products", async (req, res) => {
    const data = req.body
    console.log(data);
    // database er name alz single rakba
    const sql = "INSERT INTO watch(`Watch_name`,`Watch_brand`,`Watch_image`,`Watch_gender`,`Watch_price`,`Watch_note`)  VALUES(?)"
    if (data) {
        const values = [data?.name, data?.brand, data?.imgURL, data?.gender, data?.price, data?.note]
        con.query(sql, [values], (error, result) => {
            if (error) {
                return res.send("error paise")
            }
            res.send("successful")

        })
    }

})



app.listen(port, () => {
    console.log(`The server is running at ${port}`);
})